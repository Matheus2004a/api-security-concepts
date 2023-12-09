import { FastifyReply, FastifyRequest } from 'fastify';
import ProductsRepository from '../repositories/ProductsRepository';

class ProductsController {
  async index(request: FastifyRequest, reply: FastifyReply) {
    const restaurants = await ProductsRepository.listAll();

    if (restaurants.length <= 0) {
      return reply.status(404).send({ message: 'Nenhum produto cadastrado' });
    }

    return restaurants;
  }

  async show(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params;

    const product = await ProductsRepository.findById(id);

    if (!product) {
      return reply.status(404).send({ message: 'Produto não encontrado' });
    }

    return product;
  }

  async store(request: FastifyRequest, reply: FastifyReply) {
    const { name, price, category, restaurant_id } = request.body;

    
  }
}

export default new ProductsController();
