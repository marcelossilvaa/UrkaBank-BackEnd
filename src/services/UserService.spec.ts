import { UserService } from "./UserService";
import * as jwt from 'jsonwebtoken'

jest.mock('../repositories/UserRepository')
jest.mock('../database', () => {
  initialize: jest.fn
})
jest.mock('jsonwebtoken')

const mockUserRepository = require('../repositories/UserRepository')

describe('UserService', () => {
  const userService = new UserService(mockUserRepository)
  const mockUser = {
    id_user:'123456',
    name: 'Marce',
    email: 'marce@dio.com',
    password: '123456'
  }

  it('Deve adicionar um novo usuário', async() => {
    mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve({
      id_user:'123456',
      name: 'Marce',
      email: 'marce@dio.com',
      password: '123456'
    }))
    const response = await userService.createUser('Marce', 'marce@dio.com', '123456');
    expect(mockUserRepository.createUser).toHaveBeenCalled()
    expect(response).toMatchObject(
      {
        id_user:'123456',
        name: 'Marce',
        email: 'marce@dio.com',
        password: '123456'
      }
    )
  })
  it('Devo retornar um token de usuário autenticado', async () => {
    jest.spyOn(userService, 'getAuthenticatedUSer').mockImplementation(() => Promise.resolve(mockUser))
    jest.spyOn(jwt, 'sign').mockImplementation(() => 'token')
    const token = await userService.getToken('marce@dio.com', '123456')
    expect(token).toBe('token')
  })

  it('Deve retornar um erro caso não encontre um usuário', async () => {
    jest.spyOn(userService, 'getAuthenticatedUSer').mockImplementation(() => Promise.resolve(null))
    await expect(userService.getToken('invalid@dio', '123456')).rejects.toThrowError(new Error('Email/password invalid!'))
  })
})

