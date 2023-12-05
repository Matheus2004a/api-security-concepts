import { FastifyReply, FastifyRequest } from 'fastify';

import RestaurantRepository from '../repositories/RestaurantRepository';

class RestaurantController {
  async index(request: FastifyRequest, reply: FastifyReply) {
    const restaurants = await RestaurantRepository.listAll();

    if (restaurants.length <= 0) {
      return reply.status(404).send({ message: 'Nenhum restaurante cadastrado' });
    }

    return restaurants;
  }

  async show(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params;

    const restaurant = await RestaurantRepository.findById(id);

    if (!restaurant) {
      return reply.status(404).send({ message: 'Restaurante não encontrado' });
    }

    return restaurant;
  }
}

export default new RestaurantController();
