import { FastifyInstance } from "fastify";

import { UserService } from "../services/user.service";
import { User } from "../entities/user.entity";
import { Unauthorized } from "../errors/Unauthorized";
import { BadRequest } from "../errors/BadRequest";

const userService = new UserService();

export default async function userRoutes(fastify: FastifyInstance) {
  // Retorna os dados do usuário.
  fastify.get("/@me", async (request, reply) => {
    const user = request.user;

    if (user) {
      const { id, email, firstName, lastName } = await userService.getUserById(
        user.id
      );

      return reply.status(200).send({ id, email, firstName, lastName });
    }

    throw new BadRequest("Necessário realizar o login.");
  });

  // Retorna uma lista de todos os usuários.
  fastify.get("/", async (request, reply) => {
    const users = await userService.getUsers();
    reply.status(200).send(users);
  });

  // Cria um novo usuário.
  fastify.post<{ Body: User }>(
    "/",
    { public: true },
    async (request, reply) => {
      const { firstName, lastName, email, password } = request.body;

      const user = await userService.createUser(
        firstName,
        lastName,
        email,
        password
      );

      reply.status(201).send(user);
    }
  );

  // Atualizar um usuário existente.
  fastify.put<{ Body: User; Params: { id: string } }>(
    "/:id",
    async (request, reply) => {
      const { id } = request.params;
      const { firstName, lastName, email } = request.body;

      const user = await userService.updateUser(id, firstName, lastName, email);
      reply.status(200).send(user);
    }
  );

  // Deletar um usuário existente.
  fastify.delete<{ Params: { id: string } }>("/:id", async (request, reply) => {
    const { id } = request.params;
    await userService.deleteUser(id);

    reply.status(204).send({});
  });
}
