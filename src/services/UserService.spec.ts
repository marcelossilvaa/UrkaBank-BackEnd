import { UserService } from "./UserService";

jest.mock('../repositories/UserRepository')
jest.mock('../database', () => {
  initialize: jest.fn
})

const mockUserRepository = require('../repositories/UserRepository')

describe('UserService', () => {
  const userService = new UserService(mockUserRepository)

  it('Deve adicionar um novo usuário', async() => {
    mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve({
      id_user:'1233456',
      name: 'Marce',
      email: 'marce@dio.com',
      password: '123456'
    }))
    const response = await userService.createUser('Marce', 'marce@dio.com', '123456');
    expect(mockUserRepository.createUser).toHaveBeenCalled()
    expect(response).toMatchObject(
      {
        id_user:'1233456',
        name: 'Marce',
        email: 'marce@dio.com',
        password: '123456'
      }
    )
  })
})