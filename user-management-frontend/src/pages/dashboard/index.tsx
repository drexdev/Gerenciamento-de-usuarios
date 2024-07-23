import { useAuth } from "../../contexts/auth-context";

export default function Dashboard() {
  const { user, logout } = useAuth<true>(); // Pega os dados do usuário, caso ele esteja autenticado, typar <true>.

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>{user.firstName}</h2>
      <h2>{user.lastName}</h2>
      <h2>{user.email}</h2>
      <h2>{user.id}</h2>

      <button onClick={() => logout()}>Sign out</button>
    </div>
  );
}
