import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { clientIdRule } from './rules/client_id.js'
import { productIdRule } from './rules/product_id.js'

vine.messagesProvider = new SimpleMessagesProvider(
  {
    'number': 'O valor do campo {{ field }} deve ser um number.',

    'client_id.required': 'Por favor, preencha o id do cliente.',
    'client_id.number': 'tipo invalido.',
    'product_id.required': 'Por favor, preencha o id do produto.',
    'quantity.required': 'Por favor, preencha a quantidade.',
  },
  {
    client_id: 'id do cliente',
    product_id: 'id do produto',
    quantity: 'quantidade',
  }
)

export const saleValidator = vine.compile(
  vine.object({
    client_id: vine.number().use(
      clientIdRule({
        table: 'clients',
        column: 'id',
      })
    ),
    product_id: vine.number().use(
      productIdRule({
        table: 'products',
        column: 'id',
      })
    ),
    quantity: vine.number(),
  })
)
