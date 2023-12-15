import { FastifyReply, FastifyRequest } from 'fastify';
import { IProduct } from '../../types/Product';
import ProductsRepository from '../repositories/ProductsRepository';

class ProductsController {
  async index(request: FastifyRequest, reply: FastifyReply) {
    const restaurants = await ProductsRepository.listAll();

    if (restaurants.length <= 0) {
      return reply.status(404).send({ message: 'Nenhum produto cadastrado' });
    }

    return restaurants;
  }

  async show(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = request.params;

    const product = await ProductsRepository.findById(id);

    if (!product) {
      return reply.status(404).send({ message: 'Produto não encontrado' });
    }

    return product;
  }

  async store(request: FastifyRequest<{ Body: IProduct }>, reply: FastifyReply) {
    const { name, price, category_id, restaurant_id } = request.body;

    await ProductsRepository.register({ name, price, category_id, restaurant_id });

    reply.status(201).send({ message: 'Produto cadastrado com sucesso' });
  }

  async update(request: FastifyRequest<{ Params: { id: string }, Body: IProduct }>, reply: FastifyReply) {
    const { id } = request.params;
    const { name, price, category_id, restaurant_id } = request.body;

    const product = await ProductsRepository.findById(id);

    if (!product) {
      return reply.status(404).send({ message: 'Produto não encontrado' });
    }

    await ProductsRepository.update(id, { name, price, category_id, restaurant_id });

    reply.status(202).send({ message: 'Produto atualizado com sucesso' });
  }

  async delete(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = request.params;

    const product = await ProductsRepository.findById(id);

    if (!product) {
      return reply.status(404).send({ message: 'Produto não encontrado' });
    }

    await ProductsRepository.delete(id);

    reply.status(202).send({ message: 'Produto deletado com sucesso' });
  }
}

export default new ProductsController();
