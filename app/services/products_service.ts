import { NotFoundException } from '#exceptions/http_exceptions'
import Product from '#models/product'

interface ProductData {
  name: string | undefined
  description: string | undefined
  price: number | undefined
}

class ProductsService {
  async listAllProducts() {
    return await Product.query()
      .select('id', 'name', 'description', 'price')
      .where('is_deleted', false)
      .orderBy('name', 'asc')
  }

  async showProduct(id: string) {
    const product = await Product.find(id)
    if (!product || product.isDeleted) throw new NotFoundException('Product not found')

    return product
  }

  async createProduct(data: ProductData) {
    const product = await Product.create(data)
    return product
  }

  async updateProduct(id: string, data: ProductData) {
    const product = await Product.find(id)
    if (!product || product.isDeleted) throw new NotFoundException('Product not found')

    product.merge(data)
    await product.save()

    return product
  }

  async deleteProduct(id: string) {
    const product = await Product.find(id)
    if (!product) throw new NotFoundException('Product not found')

    product.isDeleted = true
    await product.save()
  }
}

export default new ProductsService()
