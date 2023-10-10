import { Router } from "express";
import { container } from "tsyringe";
import { UserController } from "./Controllers/UserController";

const routes = Router();
const _userController = container.resolve(UserController);

routes.post('/User/Create', _userController.create);
routes.get('/User/:userId', _userController.getById);
export default routes;