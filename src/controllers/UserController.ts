import { Request, Response, response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {

  userService: UserService

  constructor(
    userService = new UserService()
  ){
    this.userService = userService
  }

  createUser = (request: Request, reponse: Response) => {
    const userService = new UserService()
    const user = request.body

    if(!user.name){
      return reponse.status(400).json({message: 'Bad request! Name required'})
    }
    if(!user.email){
      return reponse.status(400).json({message: 'Bad request! Email required'})
    }

    userService.createUser(user.name, user.email)
    return reponse.status(201).json({ message: 'Usuário criado' })
  }


  deleteUser = (request: Request, response: Response) => {
    const userEmailToDelete = request.body.email;

    if (!userEmailToDelete) {
      return response.status(400).json({ message: 'Bad request! Email required' });
    }

    const isDeleted = this.userService.deleteUserByEmail(userEmailToDelete);
    if (isDeleted) {
      return response.status(200).json({ message: 'Usuário deletado' });
    } else {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }
  };
  

  getAllUsers = (request: Request, response: Response) => {
    const userService = new UserService()

    const users = userService.getAllUsers()
    return response.status(200).json(users)
  }
}