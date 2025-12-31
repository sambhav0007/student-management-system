import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export class SignupDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsEnum(Role)
  role: Role;
}
