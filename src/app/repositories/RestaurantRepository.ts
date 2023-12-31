import { randomUUID } from 'node:crypto';

import { prisma } from '../../lib/prisma';
import { IRestaurant } from '../../types/Restaurant';

class RestaurantRepository {
  async listAll() {
    const allRestaurants = await prisma.tbl_restaurants.findMany();
    return allRestaurants;
  }

  async findById(id: string) {
    const restaurant = await prisma.tbl_restaurants.findUnique({
      where: { id }
    });

    return restaurant;
  }

  async listProductsByRestaurantId(id: string) {
    const products = await prisma.tbl_products.findMany({
      where: {
        tbl_restaurants_id: id
      }
    });

    return products;
  }

  async register(data: IRestaurant) {
    const newRestaurant = await prisma.tbl_restaurants.create({
      data: {
        id: randomUUID(),
        name: data.name,
        photo: data.photo || null,
        street: data.street,
        street_number: data.street_number,
        street_comp: data.street_comp || null,
        date_open: data.date_open,
        date_close: data.date_close
      }
    });

    return newRestaurant;
  }

  async update(id: string, data: IRestaurant) {
    await prisma.tbl_restaurants.update({
      where: { id },
      data: {
        name: data.name,
        photo: data.photo || null,
        street: data.street,
        street_number: data.street_number,
        street_comp: data.street_comp || null,
        date_open: data.date_open,
        date_close: data.date_close
      }
    });
  }

  async remove(id: string) {
    await prisma.tbl_restaurants.delete({
      where: { id }
    });
  }
}

export default new RestaurantRepository();
