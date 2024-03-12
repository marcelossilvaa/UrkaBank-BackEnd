import { Request, Response } from 'express'


const db = [
  {
    name: "Joaquim",
    email: "Joaquim@dio.me"
  }
]

export class UserController {
  createUser = (request: Request, reponse: Response) => {
    const user = request.body
    db.push(user)
    console.log(db)
    return reponse.status(201).json({ message: 'Usuário criado' })
  }
}