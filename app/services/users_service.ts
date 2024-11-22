import User from '#models/user'
import type { RegisterRequest } from '#controllers/interfaces/register'
import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'

interface ClientData {
  email: string
  password: string
}

class UsersService {
  async signup(payload: RegisterRequest) {
    const user = await User.create(payload)
    return { email: user.email }
  }

  async login(data: ClientData, auth: HttpContext['auth']) {
    const user = await User.verifyCredentials(data.email, data.password)
    const userToken = await auth.use('jwt').generate(user, { expiresIn: env.get('JWT_EXPIRES_IN') })
    return {
      email: user.email,
      ...userToken,
    }
  }
}

export default new UsersService()
