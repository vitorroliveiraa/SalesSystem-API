import { symbols, errors } from '@adonisjs/auth'
import { AuthClientResponse, GuardContract } from '@adonisjs/auth/types'
import type { HttpContext } from '@adonisjs/core/http'
import jwt from 'jsonwebtoken'
import { JwtUserProviderContract } from '../app/interfaces/jwt.js'

export type JwtGuardOptions = {
  secret: string
}

export class JwtGuard<UserProvider extends JwtUserProviderContract<unknown>>
  implements GuardContract<UserProvider[typeof symbols.PROVIDER_REAL_USER]>
{
  /**
   * Uma lista de eventos e seus tipos emitidos por
   * a guarda.
   */
  declare [symbols.GUARD_KNOWN_EVENTS]: {}
  /**
   * Um nome exclusivo para o driver de guarda
   */
  driverName: 'jwt' = 'jwt'
  /**
   * Uma flag para saber se a autenticação foi uma tentativa
   * durante a requisição HTTP atual
   */
  authenticationAttempted: boolean = false
  /**
   * Um booleano para saber se a requisição atual tem
   * sido autenticado
   */
  isAuthenticated: boolean = false
  /**
   * Referência ao usuário atualmente autenticado
   */
  user?: UserProvider[typeof symbols.PROVIDER_REAL_USER]

  #ctx: HttpContext
  #userProvider: UserProvider
  #options: JwtGuardOptions

  constructor(ctx: HttpContext, userProvider: UserProvider, options: JwtGuardOptions) {
    this.#ctx = ctx
    this.#userProvider = userProvider
    this.#options = options
  }

  /**
   * Gere um token JWT para um determinado usuário.
   */
  async generate(
    user: UserProvider[typeof symbols.PROVIDER_REAL_USER],
    options?: { expiresIn?: string | number }
  ) {
    const providerUser = await this.#userProvider.createUserForGuard(user)
    const token = jwt.sign({ userId: providerUser.getId() }, this.#options.secret, options)
    return {
      type: 'bearer',
      token: token,
    }
  }

  /**
   * Autentique a requisição HTTP atual e retorne
   * a instância do usuário se houver um token JWT válido
   * ou lançar uma exceção
   */
  async authenticate(): Promise<UserProvider[typeof symbols.PROVIDER_REAL_USER]> {
    /**
     * Evite re-autenticação quando já foi feita
     * para a requisição fornecida
     */
    if (this.authenticationAttempted) {
      return this.getUserOrFail()
    }
    this.authenticationAttempted = true

    /**
     * Certifique-se de que o cabeçalho de autenticação exista
     */
    const authHeader = this.#ctx.request.header('authorization')
    if (!authHeader) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
        guardDriverName: this.driverName,
      })
    }

    /**
     * Divida o valor do cabeçalho e leia o token dele
     */
    const [, token] = authHeader.split('Bearer ')
    if (!token) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
        guardDriverName: this.driverName,
      })
    }

    /**
     * Verifique o token
     */
    const payload = jwt.verify(token, this.#options.secret)
    if (typeof payload !== 'object' || !('userId' in payload)) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
        guardDriverName: this.driverName,
      })
    }

    /**
     * Busque o usuário por ID de usuário e salve uma referência a ele
     */
    const providerUser = await this.#userProvider.findById(payload.userId)
    if (!providerUser) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
        guardDriverName: this.driverName,
      })
    }
    this.user = providerUser.getOriginal()
    return this.getUserOrFail()
  }

  /**
   * Igual a authenticate, mas não lança uma exceção
   */
  async check(): Promise<boolean> {
    try {
      await this.authenticate()
      return true
    } catch {
      return false
    }
  }

  /**
   * Retorna o usuário autenticado ou lança um erro
   */
  getUserOrFail(): UserProvider[typeof symbols.PROVIDER_REAL_USER] {
    if (!this.user) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
        guardDriverName: this.driverName,
      })
    }
    return this.user
  }

  /**
   * Este método é chamado por Japa durante o teste quando "loginAs"
   * método é usado para logar o usuário.
   */
  async authenticateAsClient(
    user: UserProvider[typeof symbols.PROVIDER_REAL_USER]
  ): Promise<AuthClientResponse> {
    const token = await this.generate(user)
    return {
      headers: {
        authorization: `Bearer ${token.token}`,
      },
    }
  }
}
