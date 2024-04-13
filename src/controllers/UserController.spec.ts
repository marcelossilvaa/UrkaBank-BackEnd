import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { UserController } from "./UserController"
import { Request } from  'express'

const mockUserService = {
  createUser: jest.fn()
}

jest.mock('../services/UserService', () => {
  return{
    UserService: jest.fn().mockImplementation(() => {
      return mockUserService
    })
  }
})
describe('UserController', () => {
  const userController = new UserController();
  const mockResponse = makeMockResponse()

  it('Deve adicionar um novo usuário', () => {
    const mockRequest = {
      body: {
        name: 'Marce',
        email: 'marce@dio',
        password: 'password'
      }
    } as Request
    
    userController.createUser(mockRequest, mockResponse)
    expect(mockResponse.state.status).toBe(201)
    expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
  })

  it('Erro caso o usuário não informar nome', () => {
    const mockRequest = {
      body: {
        name: '',
        email: 'marce@dio',
        password: 'password'
      }
    } as Request
    const mockResponse = makeMockResponse()
    userController.createUser(mockRequest, mockResponse)
    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! All fields are required!' })
  })

  it('Erro caso o usuário não informar email', () => {
    const mockRequest = {
      body: {
        name: 'Marce',
        email: '',
        password: 'password'
      }
    } as Request
    const mockResponse = makeMockResponse()
    userController.createUser(mockRequest, mockResponse)
    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! All fields are required!' })
  })


  
  it('Erro caso o usuário não informar nome password', () => {
    const mockRequest = {
      body: {
        name: 'Marce',
        email: 'marce@dio',
        password: ''
      }
    } as Request
    const mockResponse = makeMockResponse()
    userController.createUser(mockRequest, mockResponse)
    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! All fields are required!' })
  })
  it('Deve retornar a mensagem de usuário deletado', () => {
    const mockRequest = {
      body: {
        name: 'Marce',
        email: '',
      }
    }as Request
  
    userController.deleteUser(mockRequest, mockResponse)
    expect(mockResponse.state.status).toBe(200)
    expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado' })
  })
})