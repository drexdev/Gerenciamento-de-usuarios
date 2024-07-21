import { IsString, IsEmail, Length, IsOptional, validate, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'O primeiro nome deve ser uma string.' })
  @Length(3, 50, { message: 'O primeiro nome deve ter entre 3 e 50 caracteres.' })
  @Matches(/^[a-zA-Z]+$/, {
    message: 'O primeiro nome deve conter apenas letras.'
  })
  firstName?: string;

  @IsOptional()
  @IsString({ message: 'O sobrenome deve ser uma string.' })
  @Length(3, 50, { message: 'O sobrenome deve ter entre 3 e 50 caracteres.' })
  @Matches(/^[a-zA-Z]+$/, {
    message: 'O sobrenome deve conter apenas letras.'
  })
  lastName?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Formato de email inválido.' })
  email?: string;
}
