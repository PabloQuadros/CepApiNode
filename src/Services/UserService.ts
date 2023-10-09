import { inject, injectable } from "tsyringe";
import { User } from "../Entities/Domain/User";
import { UserRecord } from "../Entities/Records/UserRecord";
import { UserRepository } from "../Repositories/UserRepository";

@injectable()
export class UserService {

    constructor(
        @inject("UserRepository")
        private _userRepository: UserRepository){
    }

    async createUser(user : UserRecord): Promise<string | null> {
        try {
            const exist = this._userRepository.getUserByEmail(user.email);            
            if (!exist) {
                throw new Error("The informed e-mail is already in use.")
            }

            let newUser = new User(
               "",
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
}