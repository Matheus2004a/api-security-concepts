
import { prisma } from '../../lib/prisma';

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
}

export default new RestaurantRepository();
