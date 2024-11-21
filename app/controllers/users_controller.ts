import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import { RegisterRequest, RegisterResponseBody } from './interfaces/register.js'
import UsersService from '../services/users_service.js'

export default class UsersController {
  async signup({ request, response }: HttpContext): Promise<void> {
    const payload: RegisterRequest = await request.validateUsing(registerValidator)

    const user: RegisterResponseBody = await UsersService.signup(payload)
    return response.status(201).json(user)
  }

  async login({ request, response }: HttpContext): Promise<void> {
    const { email, password } = await request.validateUsing(loginValidator)

    const { token, user } = await UsersService.login(email, password)

    return response.ok({
      token: token,
      ...user.serialize(),
    })
  }
}
