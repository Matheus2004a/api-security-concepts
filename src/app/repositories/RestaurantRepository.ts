import { randomUUID } from 'node:crypto';

import { prisma } from '../../lib/prisma';
import { CreateUser } from '../../types/User';

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

  async register(data: CreateUser) {
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

  async remove(id: string) {
    await prisma.tbl_restaurants.delete({
      where: { id }
    });
  }
}

export default new RestaurantRepository();
