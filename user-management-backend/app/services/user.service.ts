import { client } from "../database";
import { User } from "../entities/user.entity";

import * as bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import { NotFound } from "../errors/NotFound";
import { BadRequest } from "../errors/BadRequest";
import { validate } from "class-validator";
import { UpdateUserDto } from "../dtos/update-user-dto";
import { CreateUserDto } from "../dtos/create-user-dto";
import { InternalError } from "../errors/InternalError";

export class UserService {
  /**
   * Utilizado para obter todos os usuários.
   * @returns Uma Promise de uma lista de usuários.
   * @throws Erro se houver um problema na consulta ao banco de dados.
   */
  async getUsers(): Promise<User[]> {
    try {
      const { rows } = await client.query<User>("SELECT id, email, first_name, last_name FROM users ORDER BY id");
      return rows
    } catch (error) {
      // Log do erro pode ser adicionado aqui
      throw new Error("Erro ao obter os usuários");
    }
  }

  /**
   * Utilizado para obter um usuário pelo ID.
   * @param id ID do usuário.
   * @returns Uma Promise com o usuário correspondente ao ID.
   * @throws Erro se houver um problema na consulta ao banco de dados.
   */
  async getUserById(id: string): Promise<User> {
    try {
      const { rows } = await client.query<User>(
        "SELECT * FROM users WHERE id = $1",
        [id]
      ); // Busca o usuário pelo ID

      return rows[0] || null;
    } catch (error) {
      throw new InternalError(500, "Ocorreu um erro ao buscar o usuário.");
    }
  }

  /**
   * Utilizado para obter um usuário pelo email.
   * @param email Email do usuário.
   * @returns Uma Promise com o usuário correspondente ao email.
   * @throws Erro se houver um problema na consulta ao banco de dados.
   */
  async getUserByEmail(email: string): Promise<User> {
    try {
      const { rows } = await client.query<User>(
        "SELECT * FROM users WHERE email = $1",
        [email]
      ); // Busca o usuário pelo email

      return rows[0] || null;
    } catch (error) {
      throw new InternalError(500, "Ocorreu um erro ao buscar o usuário.");
    }
  }

  /**
   * Utilizado para criar um novo usuário.
   * @param firstName Primeiro nome do novo usuário.
   * @param lastName Sobrenome do novo usuário.
   * @param email Email do novo usuário.
   * @param password Senha do novo usuário.
   * @returns Uma Promise com o novo usuário criado.
   * @throws Erro se houver um problema na consulta ao banco de dados.
   */
  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<User> {
    const id = uuid(); // Cria um ID unico;
    const hashedPassword = await bcrypt.hash(password, 10); // Cria uma senha hash;

    if (email) {
      const existingUser = await this.getUserByEmail(email); // Verifica se o email existe;
      if (existingUser) {
        throw new BadRequest("Este email está sendo usado por outro usuário.");
      }
    }

    const createUserDto = new CreateUserDto();
    createUserDto.firstName = firstName;
    createUserDto.lastName = lastName;
    createUserDto.email = email;
    createUserDto.password = password;

    const errors = await validate(createUserDto);
    if (errors.length > 0) {
      const errorMessages = errors
        .map((err) => Object.values(err.constraints || {}))
        .flat();
      throw new BadRequest(errorMessages);
    }

    try {
      await client.query("BEGIN"); // Inicia uma transação.

      const { rows } = await client.query<User>(
        `INSERT INTO users (id, first_name, last_name, email, password) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING id, first_name, last_name, email`,
        [id, firstName, lastName, email, hashedPassword]
      );

      await client.query("COMMIT"); // Confirma a transação.

      return rows[0]; // Retorna o usuário criado, sem a senha.
    } catch (error) {
      await client.query("ROLLBACK"); // Desfaz a transação.
      throw new InternalError(500, "Erro ao criar o novo usuário");
    }
  }

  /**
   * Utilizado para atualizar um usuário existente.
   * @param id ID do usuário a ser atualizado.
   * @param firstName Primeiro nome do usuário a ser atualizado.
   * @param lastName Sobrenome do usuário a ser atualizado.
   * @param email Email do usuário a ser atualizado.
   * @returns Uma Promise com o usuário atualizado.
   * @throws Erro se houver um problema na consulta ao banco de dados.
   */
  async updateUser(
    id: string,
    firstName?: string,
    lastName?: string,
    email?: string
  ): Promise<User> {
    if (!id) {
      throw new BadRequest("O ID é obrigatório.");
    }

    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFound("Usuário não encontrado.");
    }

    const updateUserDto = new UpdateUserDto();

    updateUserDto.firstName = firstName;
    updateUserDto.lastName = lastName;
    updateUserDto.email = email;

    const errors = await validate(updateUserDto);

    if (errors.length > 0) {
      const errorMessages = errors
        .map((err) => Object.values(err.constraints || {}))
        .flat();
      throw new BadRequest(errorMessages);
    }

    if (email) {
      const existingUser = await this.getUserByEmail(email);

      if (existingUser && existingUser.id !== id) {
        throw new BadRequest("Este email está sendo usado por outro usuário.");
      }
    }

    try {
      await client.query("BEGIN"); // Inicia a transação.

      const { rows } = await client.query<User>(
        `UPDATE users 
       SET first_name = COALESCE($1, first_name), 
           last_name = COALESCE($2, last_name), 
           email = COALESCE($3, email) 
       WHERE id = $4 
       RETURNING id, first_name, last_name, email`,
        [firstName, lastName, email, id]
      );

      await client.query("COMMIT"); // Confirma as alterações no banco de dados.

      return rows[0]; // Retorna o usuário atualizado.
    } catch (error) {
      await client.query("ROLLBACK"); // Desfaz as alterações no banco de dados.
      throw new InternalError(500, `Erro ao atualizar o usuário com ID ${id}`);
    }
  }

  /**
   * Utilizado para remover um usuário existente.
   * @param id ID do usuário a ser removido.
   * @throws Erro se houver um problema na consulta ao banco de dados.
   */
  async deleteUser(id: string): Promise<void> {
    if (!id) {
      // Verifica se o ID foi passado como parâmetro
      throw new BadRequest("O ID é obrigatório.");
    }

    const user = await this.getUserById(id); // Busca o usuário pelo ID

    if (!user) {
      throw new NotFound("Usuário não encontrado");
    }

    await client.query("DELETE FROM users WHERE id = $1", [id]);
    return;
  }
}
