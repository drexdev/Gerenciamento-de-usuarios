import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import fp from "fastify-plugin";
import jwt from "jsonwebtoken";

import { Unauthorized } from "../errors/Unauthorized";
import { UserPayload } from "../@types/fastify";
import { BadRequest } from "../errors/BadRequest";

const routesPublic = new Set<string>(); // Armazena as rotas publicas.

const authMiddleware = fp(
  async (fastify: FastifyInstance) => {
    fastify.decorate(
      "authenticate",
      async function (request: FastifyRequest, reply: FastifyReply) {
        const authorization = request.headers.authorization; // Verifica se o token foi informado.
        if (!authorization) {
          throw new BadRequest("Nenhum token foi informado.");
        }

        const token = authorization.split(" ")[1]; // Separa o token da autorização.
        try {
          const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as UserPayload;
          request.user = decoded; // Armazena o usuário na requisição.
        } catch (error) {
          throw new Unauthorized("O token inserido é inválido.");
        }
      }
    );

    // Adiciona as rotas públicas ao conjunto `routesPublic`.
    fastify.addHook("onRoute", (routeConfig) => {
      if (routeConfig.public) {
        routesPublic.add(`${routeConfig.method}:${routeConfig.url}`);
      }
    });

    // Verifica a autenticação para rotas não públicas.
    fastify.addHook("preValidation", async (request, reply) => {
      if (!routesPublic.has(`${request.method}:${request.url}`)) {
        await fastify.authenticate(request, reply);
      }
    });
  }
);

export default authMiddleware;
