import { createRequest, createResponse } from 'node-mocks-http'
import User from '../../../models/User'
import { AuthController } from '../../../controllers/AuthController'

// Importamos como módulos completos para usar jest.spyOn()
import * as authUtils from '../../../utilities/auth'
import * as jwtUtils from '../../../utilities/jwt'

// Mock explícito de User para tener acceso a sus métodos mockeables
jest.mock('../../../models/User', () => ({
  __esModule: true,
  default: {
    findOne: jest.fn()
  }
}))

describe('AuthController.login', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should return 404 if user not found', async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null)

    const req = createRequest({
      method: 'POST',
      url: '/api/auth/login',
      body: {
        user_name: 'user123',
        password: 'testpass'
      }
    })

    const res = createResponse()

    await AuthController.login(req, res)

    const data = res._getJSONData()

    expect(res.statusCode).toBe(404)
    expect(data).toEqual({ error: 'Usuario no encontrado' })
    expect(User.findOne).toHaveBeenCalledWith({ where: { user_name: 'user123' } })
  })

  it('should return 401 if password is incorrect', async () => {
    const userMock = {
      id: 1,
      user_name: 'user123',
      password: 'hashedpass'
    }; // ← ✅ solo punto y coma

    (User.findOne as jest.Mock).mockResolvedValue(userMock)
    jest.spyOn(authUtils, 'checkPassword').mockResolvedValue(false)

    const req = createRequest({
      method: 'POST',
      url: '/api/auth/login',
      body: {
        user_name: 'user123',
        password: 'wrongpass'
      }
    })

    const res = createResponse()

    await AuthController.login(req, res)

    const data = res._getJSONData()

    expect(res.statusCode).toBe(401)
    expect(data).toEqual({ error: 'Datos de usuario incorrectos' })
    expect(authUtils.checkPassword).toHaveBeenCalledWith('wrongpass', userMock.password)
  })

  it('should return token if login is successful', async () => {
    const userMock = {
      id: 1,
      user_name: 'user123',
      password: 'hashedpass'
    };

    (User.findOne as jest.Mock).mockResolvedValue(userMock)
    jest.spyOn(authUtils, 'checkPassword').mockResolvedValue(true)
    jest.spyOn(jwtUtils, 'generateJWT').mockReturnValue('fake_token')

    const req = createRequest({
      method: 'POST',
      url: '/api/auth/login',
      body: {
        user_name: 'user123',
        password: 'correctpass'
      }
    })

    const res = createResponse()

    await AuthController.login(req, res)

    const data = res._getJSONData()

    expect(res.statusCode).toBe(200)
    expect(data).toEqual({ token: 'fake_token' })
    expect(jwtUtils.generateJWT).toHaveBeenCalledWith(userMock.id)
    expect(jwtUtils.generateJWT).toHaveBeenCalledTimes(1)
  })
})
