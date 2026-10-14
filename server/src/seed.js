import { products } from '../../client/src/data.js'
import { Product } from './models.js'

export async function seedProducts() {
  const existingNames = new Set((await Product.find({}, 'name')).map(product => product.name))
  const missingProducts = products
    .filter(product => !existingNames.has(product.name))
    .map(({ id, ...product }, index) => ({ ...product, inventory: 12 + (index * 7) % 40 }))
  if (missingProducts.length) await Product.insertMany(missingProducts)
}
