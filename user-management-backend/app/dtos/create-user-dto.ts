import { IsEmail, IsString, Length, Matches } from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserDto extends User {
  @IsString({ message: "O primeiro nome deve ser uma string." })
  @Length(3, 50, {
    message: "O primeiro nome deve ter entre 3 e 50 caracteres.",
  })
  @Matches(/^[a-zA-Z]+$/, {
    message: "O primeiro nome deve conter apenas letras.",
  })
  firstName: string;

  @IsString({ message: "O sobrenome deve ser uma string." })
  @Length(3, 50, { message: "O sobrenome deve ter entre 3 e 50 caracteres." })
  @Matches(/^[a-zA-Z]+$/, { message: "O sobrenome deve conter apenas letras." })
  lastName: string;

  @IsEmail({}, { message: "Formato de email inválido." })
  email: string;

  @Length(6, 50, { message: "A senha deve ter entre 6 e 50 caracteres." })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
  })
  password: string;
}
