import { FastifyInstance } from "fastify";

import { User } from "../entities/user.entity";

import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: User }>(
    "/login",
    { public: true },
    async (request, reply) => {
      const { email, password } = request.body;

      const authLogin = await authService.login(email, password); // Cria um token para o usuário.
      reply.status(200).send(authLogin);
    }
  );
}
