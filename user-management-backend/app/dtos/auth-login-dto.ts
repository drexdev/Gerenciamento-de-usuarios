import { IsEmail, IsString, Length, Matches } from "class-validator";
import { User } from "../entities/user.entity";

export class AuthLoginDto extends User {
  @IsEmail({}, { message: "Formato de email inválido." })
  email: string;

  @Length(6, 50, { message: "A senha deve ter entre 6 e 50 caracteres." })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
  })
  password: string;
}
