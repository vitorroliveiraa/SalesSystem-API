import ProductsService from '#services/products_service'
import { productValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  public async index({ response }: HttpContext) {
    const products = await ProductsService.listAllProducts()
    return response.ok(products)
  }

  public async show({ params, response }: HttpContext) {
    const product = await ProductsService.showProduct(params.id)
    return response.ok(product)
  }

  public async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(productValidator)
    const product = await ProductsService.createProduct(data)
    return response.created(product)
  }

  public async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(productValidator)
    const product = await ProductsService.updateProduct(params.id, data)
    return response.ok(product)
  }

  public async destroy({ params, response }: HttpContext) {
    await ProductsService.deleteProduct(params.id)
    return response.noContent()
  }
}
