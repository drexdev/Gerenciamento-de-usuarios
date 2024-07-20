import { FastifyInstance } from "fastify";

import { UserService } from "../services/user.service";
import { User } from "../entities/user.entity";

const userService = new UserService();

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.get("/", async (request, reply) => {
    const users = await userService.getUsers();
    reply.send(users);
  });

  fastify.post<{ Body: User }>("/", async (request, reply) => {
    const { firstName, lastName, email, password } = request.body;

    const user = await userService.createUser(
      firstName,
      lastName,
      email,
      password
    );

    reply.send(user);
  });

  // Atualizar um usuário existente.
  fastify.put<{ Body: User; Params: { id: string } }>(
    "/:id",
    async (request, reply) => {
      const { id } = request.params;
      const { firstName, lastName, email } = request.body;
      
      //   TODO: Verificar se o usuário existe.

      const user = await userService.updateUser(id, firstName, lastName, email);
      reply.send(user);
    }
  );

  // Deletar um usuário existente.
  fastify.delete<{ Params: { id: string } }>("/:id", async (request, reply) => {
    const { id } = request.params;
    await userService.deleteUser(id);

    // TODO: Verificar se o usuário existe.

    reply.status(204).send({});
  });
}
