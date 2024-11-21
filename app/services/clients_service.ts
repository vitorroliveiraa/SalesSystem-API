import { NotFoundException } from '#exceptions/http_exceptions'
import Client from '#models/client'
import Sale from '#models/sale'

interface ClientData {
  name: string | undefined
  cpf: string | undefined
}

class ClientsService {
  async listAllClients() {
    return await Client.query().select('id', 'name', 'cpf').orderBy('id', 'asc')
  }

  async showCustomerWithDetails(id: string, month?: string, year?: string) {
    const client = await Client.query()
      .where('id', id)
      .preload('sales', (salesQuery) => {
        if (month && year) {
          salesQuery
            .whereRaw('EXTRACT(MONTH FROM sale_date) = ?', [month])
            .whereRaw('EXTRACT(YEAR FROM sale_date) = ?', [year])
        }

        salesQuery.orderBy('sale_date', 'desc')
      })
      .first()

    if (!client) throw new NotFoundException('Client not found')

    return client
  }

  public async createClient(data: ClientData) {
    const client = await Client.create(data)
    return client
  }

  public async updateClient(id: number, data: ClientData) {
    const client = await Client.find(id)
    if (!client) throw new NotFoundException('Client not found')

    client.merge(data)
    await client.save()

    return client
  }

  public async deleteClient(id: number) {
    const client = await Client.find(id)
    if (!client) throw new NotFoundException('Client not found')

    await Sale.query().where('client_id', id).delete()
    await client.delete()

    return { message: 'Client and sales deleted successfully' }
  }
}

export default new ClientsService()
