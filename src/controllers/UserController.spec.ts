import { makeMockRequest } from "../__mocks__/mockRequest.mock";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { UserService } from "../services/UserService";
import { UserController } from "./UserController"
import { Request } from  'express'


describe('UserController', () => {
  const mockUserService: Partial<UserService> = {
    createUser: jest.fn(),
    deleteUserByEmail: jest.fn(),
    getAllUsers: jest.fn()
  }
  const userController = new UserController(mockUserService as UserService);

  it('Deve adicionar um novo usuário', () => {
    const mockRequest = {
      body: {
        name: 'Marce',
        email: 'marce@dio'
      }
    } as Request
    const mockResponse = makeMockResponse()
    userController.createUser(mockRequest, mockResponse)
    expect(mockResponse.state.status).toBe(201)
    expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
  })

  it('Erro caso o usuário não informar nome e/ou email', () => {
    const mockRequest = {
      body: {
      }
    } as Request
    const mockResponse = makeMockResponse()
    userController.createUser(mockRequest, mockResponse)
    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name and email required' })
  })

  it('Deve listar dos usuários', () => {
    const mockRequest = {
      body: {
        name: '',
        email: 'marce@dio'
      }
    } as Request
    const mockResponse = makeMockResponse()
    userController.getAllUsers(mockRequest, mockResponse)
    expect(mockResponse.state.status).toBe(200)
    expect(Array.isArray(mockResponse.state.json)).toBe(true)
  })

})