import db from '@adonisjs/lucid/services/db'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

type Options = {
  table: string
  column: string
}

async function unique(value: unknown, options: Options, field: FieldContext) {
  if (typeof value !== 'number') {
    return field.report('O campo {{ field }} deve ser um número válido.', 'type', field)
  }

  const row = await db
    .from(options.table)
    .select(options.column)
    .where(options.column, value)
    .first()

  if (!row) field.report('O {{ field }} informado não existe.', 'unique', field)
}

export const productIdRule = vine.createRule(unique)
