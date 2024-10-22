import consola from "consola";
import { Pool } from "pg";

export const client = new Pool({
  host: "postgres",
  user: "postgres",
  password: "root",
  database: "user-management",
  port: 5432,
});

async function start() {
  // Verificando se o banco de dados está configurado corretamente, caso não esteja conectado ou criado, ele tenta novamente a cada segundo;
  while (true) {
    try {
      await client.query("SELECT 1"); // Testa a conexão com o banco de dados
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id VARCHAR(64) UNIQUE PRIMARY KEY,
          first_name VARCHAR(255) NOT NULL,
          last_name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL
        );
      `);

      consola.success("Banco de dados criado e configurado com sucesso!");
      break;
    } catch (error) {
      consola.error(
        "Erro ao conectar ao banco de dados, tentando novamente em 1 segundo..."
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

start();
