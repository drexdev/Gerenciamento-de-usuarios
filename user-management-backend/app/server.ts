import fastify from "fastify";

import consola from "consola";
import chalk from "chalk";

import dotenv from "dotenv";

dotenv.config();

const app = fastify();

app.register(require("@fastify/cors"), { origin: true }); // Permite o acesso de qualquer origem.

app.get("/", async (request, reply) => {
  return { hello: "world" };
});

// Ligando o servidor a porta 3000, host 0.0.0.0.
app.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    consola.error(err);
    process.exit(1); 
  }

  consola.success(
    chalk.green(`Servidor está online em: http://localhost:3000`)
  );
});
