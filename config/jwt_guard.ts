import User from '#models/user'
import { Exception } from '@adonisjs/core/exceptions'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
// import { AuthClientError } from '@adonisjs/auth/errors'
// import { UserModel } from '../models/user.js'

/**
 * Implementação do JWT Guard
 */
export class JwtGuard {
  /**
   * Nome único do guard
   */
  declare name: 'jwt'

  /**
   * Autenticação em andamento
   */
  private authenticatedUser?: User

  constructor(
    public ctx: HttpContext,
    private config: Record<string, any>
  ) {}

  /**
   * Verifica se o usuário está autenticado
   */
  async check() {
    if (this.authenticatedUser) {
      return true
    }

    const token = this.ctx.request.header('authorization')?.replace('Bearer ', '')
    if (!token) {
      return false
    }

    try {
      // Aqui você implementa a lógica de verificação do token JWT
      // e busca do usuário
      const user = await User.findOrFail(1) // Substitua pela sua lógica
      this.authenticatedUser = user
      return true
    } catch (error) {
      return false
    }
  }

  /**
   * Retorna o usuário autenticado
   */
  async user() {
    if (!(await this.check())) {
      throw new Exception('Unauthorized access', { code: 'E_UNAUTHORIZED_ACCESS', status: 401 })
      // throw new AuthClientError('Unauthorized access', 401, 'E_UNAUTHORIZED_ACCESS')
    }

    return this.authenticatedUser!
  }

  /**
   * Autentica um usuário usando credenciais
   */
  async attempt(uid: string, password: string) {
    try {
      const user = await User.verifyCredentials(uid, password)
      // Gere e retorne o token JWT aqui
      return {
        type: 'bearer',
        token: 'seu-token-jwt',
      }
    } catch (error) {
      // throw new AuthClientError('Invalid credentials', 400, 'E_INVALID_CREDENTIALS')
      throw new Exception('Invalid credentials', { code: 'E_INVALID_CREDENTIALS', status: 400 })
    }
  }

  /**
   * Faz login com um usuário existente
   */
  async login(user: User) {
    this.authenticatedUser = user
    // Gere e retorne o token JWT aqui
    return {
      type: 'bearer',
      token: 'seu-token-jwt',
    }
  }

  /**
   * Faz logout do usuário
   */
  async logout() {
    // Implemente a lógica de invalidação do token se necessário
    this.authenticatedUser = undefined
  }

  /**
   * Middleware de autenticação
   */
  async handle(ctx: HttpContext, next: NextFn) {
    if (!(await this.check())) {
      throw new Exception('Unauthorized access', { code: 'E_UNAUTHORIZED_ACCESS', status: 401 })
    }

    return next()
  }
}
