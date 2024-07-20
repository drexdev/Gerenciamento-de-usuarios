import { Optional } from "../@types/utils";
import { client } from "../database";
import { User } from "../entities/user.entity";

import * as bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export class UserService {
  /**
   * Utilizado para obter todos os usuários.
   * @returns Uma Promise de uma lista de usuários.
   * @throws Erro se houver um problema na consulta ao banco de dados.
   */
  async getUsers(): Promise<User[]> {
    try {
      const { rows } = await client.query<User>("SELECT * FROM users");
      return rows;
    } catch (error) {
      // Log do erro pode ser adicionado aqui
      throw new Error("Erro ao obter os usuários");
    }
  }

  /**
   * Utilizado para criar um novo usuaário.
   * @param firstName Primeiro nome do novo usuaário.
   * @param lastName Sobrenome do novo usuaário.
   * @param email Email do novo usuaário.
   * @param password Senha do novo usuaário.
   * @returns Uma Promise com o novo usuaário criado.
   * @throws Erro se houver um problema na consulta ao banco de dados.
   */
  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<Optional<User>> {
    try {
      const id = uuid(); // Gerando um UUID para o novo usuário.
      const pass = await bcrypt.hash(password, 10); // Criando um hash da senha.

      const { rows } = await client.query<User>(
        "INSERT INTO users (id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [id, firstName, lastName, email, pass]
      );

      // Retornando o novo usuário criado.
      const result = rows[0];

      // Removendo a senha do dados retornados para o client.
      return {
        ...result,
        password: undefined,
      };
    } catch (error) {
      throw new Error("Erro ao criar o novo usuário");
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
    firstName: string,
    lastName: string,
    email: string
  ): Promise<Optional<User>> {
    try {
      const { rows } = await client.query<User>(
        "UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4 RETURNING *",
        [firstName, lastName, email, id]
      );

      // Retornando o usuário atualizado.
      const result = rows[0];
      // Removendo a senha do dados retornados para o client.
      return {
        ...result,
        password: undefined,
      };
    } catch (error) {
      throw new Error("Erro ao atualizar o usuário");
    }
  }

  /**
   * Utilizado para remover um usuário existente.
   * @param id ID do usuário a ser removido.
   * @throws Erro se houver um problema na consulta ao banco de dados.
   */
  async deleteUser(id: string): Promise<void> {
    try {
      await client.query("DELETE FROM users WHERE id = $1", [id]);
    } catch (error) {
      throw new Error("Erro ao remover o usuário");
    }
  }
}
