import Product from '#models/product'
import Sale from '#models/sale'

interface SalesData {
  client_id: number
  product_id: number
  quantity: number
}

class SalesService {
  async createSale(data: SalesData) {
    const product = await Product.find(data.product_id)

    const totalPrice = data.quantity * product!.price
    const sale = await Sale.create({
      ...data,
      unitPrice: product!.price,
      totalPrice: totalPrice,
      saleDate: new Date(),
    })

    return sale
  }
}

export default new SalesService()
