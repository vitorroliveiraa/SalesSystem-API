import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { cpfRule } from './rules/cpf.js'

// vine.messagesProvider =
vine.messagesProvider = new SimpleMessagesProvider(
  {
    'string': 'O valor do campo {{ field }} deve ser uma string.',
    'minLength': 'O campo {{ field }} deve ter no mínimo {{ options.minLength }} caracteres.',
    'name.required': 'Por favor, preencha seu nome completo.',
    'cpf.required': 'Por favor, preencha um CPF válido.',
  },
  {
    name: 'nome',
    cpf: 'CPF',
  }
)

export const clientValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
    cpf: vine
      .string()
      .trim()
      .use(
        cpfRule({
          table: 'clients',
          column: 'cpf',
        })
      ),
  })
)
