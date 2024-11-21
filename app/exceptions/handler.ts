import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import { Exception } from '@adonisjs/core/exceptions'

export default class HttpExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction

  async handle(error: unknown, ctx: HttpContext) {
    if (this.isValidationError(error)) {
      return ctx.response.status(422).send({
        code: 'E_VALIDATION_FAILURE',
        message: 'Validation failed.',
        status: 422,
        errors: (error as any).messages || [],
      })
    }

    if (error instanceof Exception) {
      return ctx.response.status(error.status || 500).send({
        code: error.code || 'E_UNKNOWN_ERROR',
        message: error.message || 'An unexpected error occurred.',
        status: error.status || 500,
      })
    }

    return ctx.response.status(500).send({
      code: 'E_INTERNAL_SERVER_ERROR',
      message: 'Internal server error.',
      status: 500,
    })
  }

  private isValidationError(error: unknown): boolean {
    return (
      typeof error === 'object' &&
      error !== null &&
      'messages' in error &&
      'status' in error &&
      (error as any).status === 422
    )
  }

  async report(error: unknown, ctx: HttpContext) {
    if (!app.inProduction) {
      console.error('Error:', {
        message: (error as any).message,
        code: (error as any).code,
        context: `${ctx.request.method()} ${ctx.request.url()}`,
      })
    }
    return
  }
}
