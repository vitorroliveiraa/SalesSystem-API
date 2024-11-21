import ClientsService from '#services/clients_service'
import { clientValidator } from '#validators/client'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClientsController {
  public async index({ response }: HttpContext) {
    const clients = await ClientsService.listAllClients()
    return response.ok(clients)
  }

  public async show({ params, request, response }: HttpContext) {
    const { month, year } = request.qs()
    const client = await ClientsService.showCustomerWithDetails(params.id, month, year)
    return response.ok(client)
  }

  public async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(clientValidator)
    const client = await ClientsService.createClient(data)
    return response.created(client)
  }

  public async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(clientValidator)
    const client = await ClientsService.updateClient(params.id, data)
    return response.ok(client)
  }

  public async destroy({ params, response }: HttpContext) {
    const result = await ClientsService.deleteClient(params.id)
    return response.ok(result)
  }
}
