import fastify, { FastifyError, FastifyReply, FastifyRequest } from "fastify";

import consola from "consola";
import chalk from "chalk";

import dotenv from "dotenv";
import { InternalError } from "./errors/InternalError";
import authMiddleware from "./middleware/auth.middleware";

const app = fastify(); // Cria uma instância do fastify.

dotenv.config();

app.register(authMiddleware); // Middleware de autenticação.

// Tratamento de erros.
app.setErrorHandler(function (error: FastifyError, _, reply) {
  if (error instanceof InternalError) {
    reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      message: error.messages,
    });
  } else {
    reply.send(error);
  }
});

app.register(require("@fastify/cors"), { origin: true }); // Permite o acesso de qualquer origem.~

app.register(require("./routes/auth.route"), { prefix: "/auth" }); // Rotas de usuários. 
app.register(require("./routes/user.route"), { prefix: "/users" }); // Rotas de usuários.

// Ligando o servidor a porta 3000, host 0.0.0.0.
app.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    consola.error(err);
    process.exit(1);
  }

  consola.success(
    chalk.green(`Servidor está online em: http://localhost:3000`)
  );
});
