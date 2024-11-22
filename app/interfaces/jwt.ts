import { symbols } from '@adonisjs/auth'

/**
 * A ponte entre o provedor de usuário e a guarda
 */
export type JwtGuardUser<RealUser> = {
  /**
   * Retorna o ID exclusivo do usuário
   */
  getId(): string | number | BigInt
  /**
   * Retorna o objeto de usuário original
   */
  getOriginal(): RealUser
}

/**
 * A interface para o UserProvider aceito pela guarda JWT.
 */
export interface JwtUserProviderContract<RealUser> {
  /**
   * Uma propriedade que a implementação da guarda pode usar para inferir
   * o tipo de dados do usuário real (também conhecido como RealUser)
   */
  [symbols.PROVIDER_REAL_USER]: RealUser
  /**
   * Crie um objeto de usuário que atua como um adaptador entre
   * a guarda e o valor real do usuário.
   */
  createUserForGuard(user: RealUser): Promise<JwtGuardUser<RealUser>>
  /**
   * Encontre um usuário por seu ID.
   */
  findById(identifier: string | number | BigInt): Promise<JwtGuardUser<RealUser> | null>
}
