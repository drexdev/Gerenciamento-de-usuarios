import { useState } from "react";
import { User } from "../../../hooks/useDashboard";

interface UserCreateProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  onSubmit: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<User>;
  onError: (title?: string, message?: string) => void;
}
export const UserCreate = ({
  firstName,
  lastName,
  email,
  password,
  onSubmit,
  onError,
}: UserCreateProps) => {
  const [firstNameValue, setFirstNameValue] = useState<string>(firstName || "");
  const [lastNameValue, setLastNameValue] = useState<string>(lastName || "");
  const [emailValue, setEmailValue] = useState<string>(email || "");
  const [passwordValue, setPasswordValue] = useState<string>(password || "");

  // Verifica se o formulário é válido;
  const isValidForm = () => {
    if (!firstNameValue || !lastNameValue || !emailValue || !passwordValue) {
      // Caso os campos estejam vazios, exibe uma mensagem de erro;
      return {
        isValid: false,
        title: "Todos os campos devem ser preenchidos",
        message: "Todos os campos devem ser preenchidos.",
      };
    }

    const nameRegex = /^[a-zA-Zà-úÀ-Ú]+$/; // Verifica se o nome contém apenas letras;
    if (!nameRegex.test(firstNameValue) || !nameRegex.test(lastNameValue)) {
      return {
        isValid: false,
        title: "Nome ou sobrenome inválido",
        message: "O nome e o sobrenome deve conter apenas letras.",
      };
    }

    // Verifica se o email é válido;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(emailValue)) {
      return {
        isValid: false,
        title: "Email inválido",
        message: "O email deve ser um email válido.",
      };
    }

    // Verifica se a senha tem ao menos 8 caracteres, incluindo maiúsculas, minúsculas e símbolos;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(passwordValue)) {
      return {
        isValid: false,
        title: "Senha inválida",
        message:
          "A senha deve ter ao menos 6 caracteres, incluindo maiúsculas, minúsculas e símbolos.",
      };
    }

    return { isValid: true };
  };

  // Envia os dados para o backend;
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const {
      isValid,
      title: formValidTitle,
      message: formValidMessage,
    } = isValidForm();

    if (!isValid) {
      // Caso o formulário seja inválido, exibe uma mensagem de erro;
      if (formValidTitle && formValidMessage) {
        onError(formValidTitle, formValidMessage);
      }
    } else {
      onSubmit(firstNameValue, lastNameValue, emailValue, passwordValue)
        .then(() => onError()) // Caso o usuário seja criado com sucesso, retira a mensagem de erro;
        .catch((error) => {
          onError("Um erro ocorreu.", error.message);
        }); // Chama a função para criar o usuário;
    }
  };

  return (
    <form className="mt-3 flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <div className="form-group">
          <label className="label">
            Nome: <span className="text-red-400">*</span>
          </label>

          <input
            type="text"
            name="firstName"
            placeholder="Ex.: João"
            minLength={3}
            maxLength={30}
            value={firstNameValue}
            onChange={(event) => setFirstNameValue(event.target.value)}
            className="input"
            required
          />
        </div>

        <div className="form-group">
          <label className="label">
            Sobrenome: <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Ex.: Silva"
            minLength={3}
            maxLength={30}
            value={lastNameValue}
            onChange={(event) => setLastNameValue(event.target.value)}
            className="input"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label className="label">
          E-mail: <span className="text-red-400">*</span>
        </label>

        <input
          type="email"
          name="email"
          placeholder="Ex.: 7YqFP@example.com"
          minLength={3}
          maxLength={30}
          value={emailValue}
          onChange={(event) => setEmailValue(event.target.value)}
          className="input"
          required
        />
      </div>

      <div className="form-group">
        <label className="label">
          Senha: <span className="text-red-400">*</span>
        </label>

        <div>
          <input
            type="password"
            name="password"
            minLength={3}
            maxLength={30}
            value={passwordValue}
            onChange={(event) => setPasswordValue(event.target.value)}
            className="input"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        onClick={(event) => handleSubmit(event)}
        className="submit-button"
      >
        Criar novo usuário
      </button>
    </form>
  );
};
