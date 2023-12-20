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

  async productsByRestaurant(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params;

    const restaurant = await RestaurantRepository.findById(id);

    if (!restaurant) {
      return reply.status(404).send({ message: 'Restaurante não encontrado' });
    }

    const products = await RestaurantRepository.listProductsByRestaurantId(id);

    return products;
  }

  async store(request: FastifyRequest, reply: FastifyReply) {
    const {
      name, street, street_number,
      street_comp, date_open, date_close
    } = request.body;

    await RestaurantRepository.register({
      name, street, street_number, street_comp,
      date_open, date_close
    });

    reply.status(201).send({ message: 'Restaurante cadastrado com sucesso' });
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params;

    const data = request.body;

    const restaurant = await RestaurantRepository.findById(id);

    if (!restaurant) {
      return reply.status(404).send({ message: 'Restaurante não encontrado' });
    }

    await RestaurantRepository.update(id, data);

    reply.status(202).send({ message: 'Restaurante atualizado com sucesso' });
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params;

    const restaurant = await RestaurantRepository.findById(id);

    if (!restaurant) {
      return reply.status(404).send({ message: 'Restaurante não encontrado' });
    }

    await RestaurantRepository.remove(id);

    reply.status(202).send({ message: 'Restaurante deletado com sucesso' });
  }
}

export default new RestaurantController();
