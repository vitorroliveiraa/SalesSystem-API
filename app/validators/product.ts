import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider(
  {
    'string': 'O valor do campo {{ field }} deve ser uma string.',
    'number': 'O valor do campo {{ field }} deve ser um number.',
    'decimal': 'O campo {{ field }} deve ter {{ digits }} casas decimais.',

    'name.required': 'Por favor, preencha o nome do produto.',
    'description.required': 'Por favor, preencha a descrição do produto.',
    'price.required': 'Por favor, preencha o preço do produto.',
    'price.min': 'O preço deve ser maior que 0.',
  },
  {
    name: 'nome',
    description: 'descrição',
    price: 'preço',
  }
)

export const productValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    description: vine.string().trim(),
    price: vine.number().decimal([0, 3]).min(0.01),
  })
)
