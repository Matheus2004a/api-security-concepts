import { randomUUID } from 'node:crypto';

import { prisma } from '../../lib/prisma';
import { IProduct } from '../../types/Product';

class RestaurantRepository {
  async listAll() {
    const allProducts = await prisma.tbl_products.findMany();
    return allProducts;
  }

  async findById(id: string) {
    const product = await prisma.tbl_products.findUnique({
      where: { id }
    });

    return product;
  }

  async register(data: IProduct) {
    const newProduct = await prisma.tbl_products.create({
      data: {
        id: randomUUID(),
        name: data.name,
        price: data.price,
        photo: data.photo,
        tbl_categories_id: data.category_id,
        tbl_restaurants_id: data.restaurant_id
      }
    });

    return newProduct;
  }
}

export default new RestaurantRepository();
