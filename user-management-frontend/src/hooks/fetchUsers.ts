import { useEffect, useState } from "react";

import { AuthData } from "../contexts/auth-context";
import { api } from "../utils/api";

const useFetchUsers = () => {
  const [fetching, setFetching] = useState(true);
  const [users, setUsers] = useState<AuthData[]>([]);

  useEffect(() => {
    api
      .get<AuthData[]>("/users")
      .then((response) => {
        console.log(response);
        setUsers(response.data);
        setFetching(false);
      })
      .catch((error) => {
        console.error(error);
        setFetching(false);
      });
  }, []);

  return { users, fetching };
};

export default useFetchUsers;
