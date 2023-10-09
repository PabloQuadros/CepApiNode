import { container } from "tsyringe";
import { UserRepository } from "../../Repositories/UserRepository";

container.registerSingleton<UserRepository>(
    "UserRepository",
    UserRepository
)