import { useEffect, useState } from "react";

import { api } from "../utils/api";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const useDashboard = () => {
  const [fetching, setFetching] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  // Busca os dados dos usuários sempre que o componente for renderizado.
  useEffect(() => {
    api
      .get<User[]>("/users")
      .then((response) => {
        setUsers(response.data);
        setFetching(false);
      })
      .catch((error) => {
        console.error(error);
        setFetching(false);
      });
  }, []);

  /**
   * Cria um novo usuário com o nome, sobrenome, email e senha fornecidos.
   *
   * @param {string} firstName - O nome do usuário.
   * @param {string} lastName - O sobrenome do usuário.
   * @param {string} email - O email do usuário.
   * @param {string} password - A senha do usuário.
   * @return {Promise<User>} Retorna o usuário criado.
   */
  async function createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<User> {
    const { data: newUser } = await api
      .post<User>("/users", {
        firstName,
        lastName,
        email,
        password,
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        throw new Error(
          typeof errorMessage === "string" ? errorMessage : errorMessage[0]
        ); // Caso haja um erro e retorne uma array, pega o primeiro erro, caso seja uma string, retorna a string.
      });

    // Cria um novo usuário na lista, retornando o usuário criado.
    setUsers([...users, newUser]);
    return newUser;
  }

  /**
   * Atualiza os dados de um usuário.
   *
   * @param {number} id - O ID do usuário a ser atualizado.
   * @param {string} firstName - O novo nome do usuário.
   * @param {string} lastName - O novo sobrenome do usuário.
   * @param {string} email - O novo email do usuário.
   * @return {Promise<User>} Retorna o usuário atualizado.
   */
  async function updateUser(
    id: number,
    firstName: string,
    lastName: string,
    email: string
  ) {
    const { data: updatedUser } = await api
      .put<User>(`/users/${id}`, {
        firstName,
        lastName,
        email,
      })
      .catch((error) => {
        throw new Error(error.response.data.message); // Caso haja um erro, mostre uma mensagem de erro.
      });

    // Atualiza os dados do usuário na lista, retornando o usuário atualizado.
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
    return updatedUser;
  }

  /**
   * Deleta um usuário pelo seu ID.
   *
   * @param {number} id - O ID do usuário a ser deletado.
   * @return {Promise<number>} Retorna o ID do usuário deletado.
   */
  async function deleteUser(id: number) {
    await api.delete(`/users/${id}`).catch((error) => {
      throw new Error(error.response.data.message); // Caso haja um erro, mostre uma mensagem de erro.
    });

    // Remove o usuário da lista, retornando o ID dele.
    setUsers(users.filter((user) => user.id !== id));
    return id;
  }

  return { users, fetching, createUser, deleteUser, updateUser };
};

export default useDashboard;
