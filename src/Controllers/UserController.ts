import { Request, Response } from "express";
import { UserService } from "../Services/UserService";
import { UserRecord } from "../Entities/Records/UserRecord";
import { container, inject, injectable } from "tsyringe";
import { UserRepository } from "../Repositories/UserRepository";
import { UserDto } from "../Entities/DTOs/UserDto";

@injectable()
export class UserController {
    async create(req: Request, res: Response){
        try {
            const userRecord: UserRecord = req.body
            const _userService = container.resolve(UserService);
            let id = await _userService.createUser(userRecord);
            return res.status(201).json({message: `Id: ${id}`});
        } catch (error) {
            return res.status(500).json({message: `${error}`});
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { userId } = req.params
            const _userService = container.resolve(UserService);
            const userDto = await _userService.getUserById(userId);

            return res.status(200).json(userDto);
        } catch (error) {
            return res.status(500).json({message: `${error}`});
        }
    }
}