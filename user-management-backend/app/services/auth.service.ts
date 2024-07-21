import { User } from "../entities/user.entity";

import * as bcrypt from "bcrypt";

import { validate } from "class-validator";

import jwt from "jsonwebtoken";
import { Unauthorized } from "../errors/Unauthorized";
import { UserService } from "./user.service";
import { AuthLoginDto } from "../dtos/auth-login-dto";
import { BadRequest } from "../errors/BadRequest";

const userService = new UserService();

export class AuthService {
  /**
   * Utilizado para autenticar um usuário.
   * @param email Email do usuário.
   * @param password Senha do usuário.
   * @returns Uma Promise com o token do usuario.
   * @throws Erro se houver falha na autenticação.
   */
  async login(
    email: string,
    password: string
  ): Promise<{ "access-token": string }> {
      const authLoginDto = new AuthLoginDto(); // Cria um DTO de autenticação.

      authLoginDto.email = email;
      authLoginDto.password = password;

      const errors = await validate(authLoginDto);

      // Validando os dados de entrada do corpo da requisição.
      if (errors.length > 0) {
        const errorMessages = errors
          .map((err) => Object.values(err.constraints || {}))
          .flat();
        throw new BadRequest(errorMessages);
      }

      const findUser = await userService.getUserByEmail(email); // Verifica se o email existe.

      if (!findUser) {
        throw new Unauthorized("Email ou senha inválidos.");
      }

      const isValidPassword = await bcrypt.compare(password, findUser.password); // Verifica se a senha inserida é igual a do usuário.
      
      if (!isValidPassword) {
        throw new Unauthorized("Email ou senha inválidos.");
      }

      const payload = {
        id: findUser.id,
        email: findUser.email,
      };

      // Cria um token para o usuário.
      const token = jwt.sign(payload, process.env.SECRET_KEY as string, {
        expiresIn: "1d",
      });

      // Retorna o token.
      return {
        "access-token": token,
      }
  }
}
