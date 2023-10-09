import { injectable } from "tsyringe";
import { User } from "../Entities/Domain/User";
import { AppDataSource } from "../data-source";

@injectable()
export class UserRepository {
    private _context = AppDataSource.getRepository(User);

    async createUser(user: User) : Promise<string | null> {
        try {
            const newUser = this._context.create(user);
            await this._context.save(newUser);
            return newUser.Id;
        } catch (error) {
            throw error;
        }
    } 

    async updateUser(updatedUser: User): Promise<void> {
        try {
            const existingUser = await this.getUserById(updatedUser.Id)
    
            if (!existingUser) {
                throw new Error("User not found");
            }

            existingUser.Name = updatedUser.Name;
            existingUser.LastUpdatedDate = new Date();
            existingUser.Email = updatedUser.Email;
            existingUser.Password = updatedUser.Password;
            existingUser.BirthDay = updatedUser.BirthDay;
            existingUser.Sex = updatedUser.Sex;
            existingUser.Role = updatedUser.Role;
    
            await this._context.save(existingUser);
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(user : string): Promise<void> {
        try {
            await this._context.delete(user);
        } catch (error) {
            throw error;
        }
    }

    async getUserById(userId: string): Promise<User | null> {
        try {
            const user = await this._context.findOne({where : {Id: userId}});
    
            if (!user) {
                throw new Error("User not found");
            }
    
            return user;
        } catch (error) {
            throw error;
        }
    }

    async getUserByEmail(email: string): Promise<User | null> {
        try {
            const user = await this._context.findOne({where : {Email: email}});
            return user;
        } catch (error) {
            throw error;
        }
    }

    async gerAllUsers(): Promise<User[]> {
        try {
            const users = await this._context.find();
            return users;
        } catch (error) {
            throw error;
        }
    }
}