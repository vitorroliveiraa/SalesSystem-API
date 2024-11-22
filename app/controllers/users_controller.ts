import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import { RegisterRequest } from './interfaces/register.js'
import UsersService from '../services/users_service.js'

export default class UsersController {
  async signup({ request, response }: HttpContext): Promise<void> {
    const payload: RegisterRequest = await request.validateUsing(registerValidator)

    const user = await UsersService.signup(payload)
    return response.status(201).json(user)
  }

  async login({ request, response, auth }: HttpContext): Promise<void> {
    const data = await request.validateUsing(loginValidator)

    const { email, type, token } = await UsersService.login(data, auth)

    return response.ok({
      email,
      type,
      token,
    })
  }
}
