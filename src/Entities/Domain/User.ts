import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PasswordHashing } from "../../Authentication/PasswordHashing";

@Entity('Users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    Id: string;
  
    @CreateDateColumn({ type: 'timestamp with time zone' , default: 'now()' })
    CreatedDate: Date;
  
    @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true })
    LastUpdatedDate: Date | null;
  
    @Column({ type: 'varchar', length: 255 })
    Name: string;
  
    @Column({ type: 'varchar', length: 255, unique: true })
    Email: string;
  
    @Column({type: 'text'})
    Password: string;
  
    @Column({ type: 'timestamp with time zone', nullable: true })
    BirthDay: Date | null;
  
    @Column({type: 'varchar', length: 255, nullable: true })
    Sex: string | null;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    Role: string | null;


    constructor(
        LastUpdatedDate: Date | null,
        Name: string,
        Email: string,
        Password: string,
        BirthDay: Date | null,
        Sex: string | null,
        Role: string | null
      ) {
        let validationErrors: string[] = [];
        this.LastUpdatedDate = LastUpdatedDate;
        this.Name = this.userNameValidation(Name, validationErrors);
        this.Email = this.userEmailValidation(Email, validationErrors);
        this.Password = this.userPasswordValidation(Password, validationErrors);
        this.BirthDay = BirthDay;
        this.Sex = this.userSexValidation(Sex, validationErrors);
        this.Role = this.userRoleValidation(Role, validationErrors);

        if (validationErrors.length > 0) {
            throw new Error(validationErrors.join("\n"));
          }
      }
    
    userNameValidation(name: string, validationErrors: string[]): string{
        const errorMessage = "The field name cannot be null and must contain a minimum of 3 and a maximum of 50 characters, including: letters and spaces.";
        
        if (!/^[a-zA-Z ]{3,50}$/.test(name || "")) {
            validationErrors.push(errorMessage);
        }
    
        return name;
    }

    userEmailValidation(email: string, validationErrors: string[]): string{
        const errorMessage = "The field e-mail is invalid.";

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "")) {
            validationErrors.push(errorMessage);
        }

        return email;
    }

    userRoleValidation(role: string | null, validationErrors: string[]): string{
        const errorMessage = "The field role is invalid, role must be 'Normal' or 'Admin'.";

        if (role === null) {
            role = "Normal";
        }

        if (role !== "Normal" && role !== "Admin") {
            validationErrors.push(errorMessage);
        }

        return role;
    }

    userSexValidation(sex: string | null, validationErrors: string[]): string{
        const errorMessage = "The field sex is invalid, sex must be 'Male' or 'Female'.";

        if (sex === null || (sex !== "Female" && sex !== "Male")) {
            validationErrors.push(errorMessage);
            sex = "Error";
        }

        return sex;
    }

    userPasswordValidation(password: string, validationErrors: string[]): string{
        const errorMessage = "The password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number and one special character (@, $, !, %, *, ?, &).";
        
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password || "")) {
            validationErrors.push(errorMessage);
        }

        return PasswordHashing.hashPassword(password);
    }
}