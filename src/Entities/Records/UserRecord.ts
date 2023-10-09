import { IsDate, IsEmail, IsIn, IsNotEmpty } from "class-validator";

export class UserRecord {
    @IsNotEmpty({ message: 'Name is required' })
    name: string | undefined;
  
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string | undefined;
  
    @IsNotEmpty({ message: 'Password is required' })
    password: string | undefined;
  
    @IsDate({ message: 'Invalid date format' })
    birthDay: Date | undefined;
  
    @IsIn(['Male', 'Female'], { message: 'Sex must be Male or Female' })
    sex: string | undefined;
  
    @IsNotEmpty({ message: 'Role is required' })
    @IsIn(['Admin', 'Normal'], { message: 'Role must be Admin or Normal' })
    role: string | undefined;
  }
  