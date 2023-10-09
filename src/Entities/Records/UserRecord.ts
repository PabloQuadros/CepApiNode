import { IsDate, IsEmail, IsIn, IsNotEmpty } from "class-validator";

export class UserRecord {
    @IsNotEmpty({ message: 'Name is required' })
    name: string;
  
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
  
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
  
    @IsDate({ message: 'Invalid date format' })
    birthDay: Date;
  
    @IsIn(['Male', 'Female'], { message: 'Sex must be Male or Female' })
    sex: string;
  
    @IsNotEmpty({ message: 'Role is required' })
    @IsIn(['Admin', 'Normal'], { message: 'Role must be Admin or Normal' })
    role: string;
  }
  