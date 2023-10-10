import { inject, injectable } from "tsyringe";
import { User } from "../Entities/Domain/User";
import { UserRecord } from "../Entities/Records/UserRecord";
import { UserRepository } from "../Repositories/UserRepository";
import { UserDto } from "../Entities/DTOs/UserDto";
import { plainToClass } from "class-transformer";
const { v4: uuidv4 } = require('uuid');

@injectable()
export class UserService {

    constructor(
        @inject("UserRepository")
        private _userRepository: UserRepository){
    }

    async createUser(user : UserRecord): Promise<string | null> {
        try {
            const exist = await this._userRepository.getUserByEmail(user.email);            
            if (exist !== null) {
                throw new Error("The informed e-mail is already in use.")
            }

            let newUser = new User(
               uuidv4(),
               null,
               user.name,
               user.email,
               user.password,
               user.birthDay,
               user.sex,
               user.role                 
                );
            newUser.userValidation();
            return await this._userRepository.createUser(newUser);
        } catch (error) {
            throw error;
        }
    }

    async getUserById(userId: string): Promise<UserDto | null> {
        try {
            let user = await this._userRepository.getUserById(userId);
                //const userDto: UserDto = plainToClass(UserDto, user);
            if(user === null){
                    return null;
            }

            let userDto = new UserDto();
            userDto.Id = user.Id;
            userDto.Name = user.Name;
            userDto.Email = user.Email;
            userDto.BirthDay = user.BirthDay;
            userDto.Role = user.Role;
            userDto.Sex = user.Sex;

            return userDto;
        } catch (error) {
            throw error;
        }
    }
}