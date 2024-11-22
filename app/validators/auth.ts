import vine from '@vinejs/vine'
import { emailRule } from './rules/email.js'

export const registerValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .use(emailRule({ table: 'users', column: 'email' })),
    password: vine.string().minLength(8).maxLength(64),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(8).maxLength(64),
  })
)
