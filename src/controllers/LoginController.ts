import { UserService } from './../services/UserService';
import { Request, Response } from 'express';

export class LoginController {
  userService: UserService

  constructor(
    userService = new UserService()
  ){
    this.userService = userService
  }

  login = async (request: Request, response: Response) => {
    const {email, passoword} = request.body

    try {
      const token = await this.userService.getToken(email, passoword)

      return response.status(200).json({ token })
    } catch (error) {
      
      return response.status(500).json({ error: 'Email/passowrd invalid!' })
    }
  }
}