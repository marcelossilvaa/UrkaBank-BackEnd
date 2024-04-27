import { AppDataSource } from "../database";
import { UserRepository } from "../repositories/UserRepository";
import { User } from "../entities/User";

export class UserService {
  private userRepository: UserRepository;

  constructor(
    userRepository = new UserRepository(AppDataSource.manager)
  ){
    this.userRepository = userRepository
  }

  createUser = async (name: string, email: string, password: string): Promise<User> => {
    const user = new User(name, email, password)
    return this.userRepository.createUser(user)
  }

  getUser = () => {

  }

  getAuthenticatedUSer = async (email: string, password: string): Promise <User | null> => {
    return this.userRepository.getUserByEmailAndPasword(email, password)
  }

  getToken = async (email: string, password: string) => {
    const user = await this.getAuthenticatedUSer(email, password)
    
    return user?.id_user
  }
}