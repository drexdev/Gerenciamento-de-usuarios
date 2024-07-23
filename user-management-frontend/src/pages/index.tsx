import { useAuth } from "../contexts/auth-context";

export default function Home() {
    const { login } = useAuth();

    return (
        <div>
            <h1 onClick={() => login("lucas@fywedev.com", "123456")}>Login</h1>
        </div>
    )
}