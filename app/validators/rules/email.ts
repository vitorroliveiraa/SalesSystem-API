import db from '@adonisjs/lucid/services/db'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

type Options = {
  table: string
  column: string
}

async function unique(value: unknown, options: Options, field: FieldContext) {
  if (typeof value !== 'string') {
    return field.report('O campo {{ field }} deve ser uma string válida.', 'type', field)
  }

  const row = await db
    .from(options.table)
    .select(options.column)
    .where(options.column, value)
    .first()

  if (row) field.report('Esse {{ field }} já está registrado.', 'unique', field)
}

export const emailRule = vine.createRule(unique)
