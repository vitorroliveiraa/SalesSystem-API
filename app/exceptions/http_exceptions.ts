import { Exception } from '@adonisjs/core/exceptions'

class HttpException extends Exception {
  constructor(message: string, status: number, code?: string) {
    super(message, { status, code })
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string, code = 'E_NOT_FOUND') {
    super(message, 404, code)
  }
}
