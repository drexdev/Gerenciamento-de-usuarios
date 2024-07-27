import { Eye, EyeSlash, LoginCurve } from "iconsax-react";
import { useState } from "react";
import { useAuth } from "../../contexts/auth-context";

export default function Login() {
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [messageAlert, setMessageAlert] = useState<{
    title: string;
    message: string;
    type: "success" | "error";
  } | null>();

  const onError = (title: string, message: string) => {
    setMessageAlert({ title, message, type: "error" });
  };

  const onSuccess = (title: string, message: string) => {
    setMessageAlert({ title, message, type: "success" });
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    login(email, password)
      .then((data) => {
        console.log(data);
        onSuccess("Sucesso", "Login efetuado com sucesso!");
      })
      .catch((error) => {
        const messagesError = error.message;
        onError("Ocorreu um erro", messagesError);
      });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center relative">
      <div className="py-7 px-7 bg-boxPrimary rounded-lg md:w-[450px] max-md:w-full max-md:h-full">
        <header className="w-full">
          <a href="/" className="flex items-center gap-4 mb-3">
            <img
              className="h-8 w-auto sm:h-10 transition-all hover:scale-110"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            />
          </a>

          <h1 className="max-md:text-sm text-base font-medium text-textTertiary tracking-wider">
            Bem-vindo de volta! 👋
          </h1>
          <h1 className="text-xl max-md:text-lg font-bold">Acesse sua conta</h1>
          <p className="text-sm max-md:text-xs text-gray-500 !leading-5">
            Para continuar, preencha as informações abaixo.
          </p>
        </header>
        {/* 
        <div className="mt-3 flex items-start justify-center flex-col py-2 px-4 w-full rounded-md bg-green-700/20 border border-green-400 animate-fadeIn">
          <h1 className="text-sm font-semibold text-green-400">Atenção!</h1>
          <p className="text-xs font-medium text-green-200">
            Usuário ou senha inválidos.
          </p>
        </div> */}

        {messageAlert && (
          <div
            className={`mt-3 flex items-start justify-center flex-col py-2 px-4 w-full rounded-md ${
              messageAlert.type === "success"
                ? "bg-green-700/20 border border-green-400 animate-fadeIn"
                : "bg-red-700/20 border border-red-400 animate-fadeIn"
            }`}
          >
            <h1
              className={`text-sm font-semibold ${
                messageAlert.type === "success"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {messageAlert.title}
            </h1>
            <p
              className={`text-xs font-medium ${
                messageAlert.type === "success"
                  ? "text-green-200"
                  : "text-red-200"
              }`}
            >
              {messageAlert.message}
            </p>
          </div>
        )}

        <form className="w-full mt-4 flex flex-col gap-1">
          <div className="form-group">
            <label htmlFor="email" className="label">
              Digite seu email:
            </label>

            <input
              id="email"
              type="email"
              minLength={3}
              maxLength={60}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex.: 7YqFP@example.com"
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="label">
              Digite sua senha:
            </label>

            <div className="flex items-center relative">
              {showPassword ? (
                <EyeSlash
                  className="absolute pl-3 right-4 cursor-pointer text-gray-500 border-l border-boxTertiary active:text-primary"
                  size={32}
                  onClick={toggleShowPassword}
                />
              ) : (
                <Eye
                  className="absolute pl-3 right-4 cursor-pointer text-gray-500 border-l border-boxTertiary active:text-primary"
                  size={32}
                  onClick={toggleShowPassword}
                />
              )}

              <input
                id="password"
                minLength={3}
                maxLength={50}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="input pr-16"
                type={showPassword ? "text" : "password"}
                required
              />
            </div>
          </div>

          <button
            className="submit-button flex items-center justify-center gap-2"
            onClick={onSubmit}
          >
            <LoginCurve size={24} color="#fff" />
            <span>Acessar conta</span>
          </button>

          <a
            className="text-sm text-textTertiary transition-all mx-auto text-center mt-4 w-4/6"
            href="/register"
          >
            Não possui uma conta?{" "}
            <b className="text-primary">Clique aqui para se cadastrar</b>
          </a>
        </form>
      </div>
    </div>
  );
}
