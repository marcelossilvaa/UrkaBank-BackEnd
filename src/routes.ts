import { LoginController } from './controllers/LoginController';
import { Router, Request, Response } from 'express';
import { UserController } from './controllers/UserController';

export const router = Router();

const userController = new UserController();
const loginController = new LoginController();

router.post('/user', (req: Request, res: Response) => {
  console.log('POST /user');
  userController.createUser(req, res);
});
router.get('/user', (req: Request, res: Response) => {
  console.log('GET /user');
  userController.listUsers(req, res);
});
router.get('/user/:userId', (req: Request, res: Response) => {
  console.log(`GET /user/${req.params.userId}`);
  userController.getUser(req, res);
});
router.delete('/user', (req: Request, res: Response) => {
  console.log('DELETE /user');
  userController.deleteUser(req, res);
});

router.post('/login', (req: Request, res: Response) => {
  console.log('POST /login');
  loginController.login(req, res);
});
