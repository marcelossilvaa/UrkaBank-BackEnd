export interface User{
  name: string
  email: string
}

const db = [
  {
    name: "Joaquim",
    email: "Joaquim@dio.me"
  }
]

export class UserService {
  db: User[]

  constructor(
    database = db
  ){
    this.db = database
  }

  createUser = (name: string, email: string) => {
    const user = {
      name,
      email
    }

    this.db.push(user)
    console.log('DB atualizado', this.db)
  }

  deleteUserByEmail = (email: string): boolean => {
    const index = this.db.findIndex((user) => user.email === email);
    if (index !== -1) {
      this.db.splice(index, 1);
      console.log('Usuário deletado:', email);
      return true;
    }
    console.log('Usuário não encontrado:', email);
    return false;
  };

  getAllUsers = (): User[] => {
    return this.db
  }
}