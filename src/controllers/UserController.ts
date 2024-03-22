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

    userService.createUser(user.name, user.email)
    return reponse.status(201).json({ message: 'Usuário criado' })
  }

  getAllUsers = (request: Request, response: Response) => {
    const userService = new UserService()

    const users = userService.getAllUsers()
    return response.status(200).json(users)
  }
}