import { container } from "tsyringe";
import { UserRepository } from "../../Repositories/UserRepository";
import { UserService } from "../../Services/UserService";
import { UserController } from "../../Controllers/UserController";
container.registerSingleton<UserService>(
    "UserService",
    UserService
)

container.registerSingleton<UserController>(
    "UserController",
    UserController
)
container.registerSingleton<UserRepository>(
    "UserRepository",
    UserRepository
)

