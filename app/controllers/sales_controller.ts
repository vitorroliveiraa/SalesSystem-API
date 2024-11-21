import SalesService from '#services/sales_service'
import { saleValidator } from '#validators/sale'
import type { HttpContext } from '@adonisjs/core/http'

export default class SalesController {
  public async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(saleValidator)
    const sale = await SalesService.createSale(data)
    return response.created(sale)
  }
}
