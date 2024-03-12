const db = [
  {
    name: "Joaquim",
    email: "Joaquim@dio.me"
  }
]

export class UserService {
  createUser = (name: string, email: string) => {
    const user = {
      name,
      email
    }

    db.push(user)
    console.log('DB atualizado', db)
  }

  getAllUsers = () => {
    return db
  }
}