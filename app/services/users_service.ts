import env from '#start/env'
import User from '#models/user'
import type { RegisterRequest } from '#controllers/interfaces/register'

class UsersService {
  async signup(payload: RegisterRequest) {
    const user = await User.create(payload)
    return user
  }

  async login(email: string, password: string) {
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user, ['*'], {
      expiresIn: env.get('JWT_EXPIRES_IN'),
    })

    return { token, user }
  }
}

export default new UsersService()
