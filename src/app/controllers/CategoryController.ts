import { FastifyReply, FastifyRequest } from 'fastify';

import CategoryRepository from '../repositories/CategoryRepository';

class CategoryController {
  async index(request: FastifyRequest, reply: FastifyReply) {
    const categories = await CategoryRepository.listAll();

    if (categories.length <= 0) {
      return reply.status(404).send({ message: 'Nenhuma categoria cadastrada' });
    }

    return categories;
  }

  async show(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = request.params;

    const category = await CategoryRepository.findById(id);

    if (!category) {
      return reply.status(404).send({ message: 'Categoria não encontrada' });
    }

    return category;
  }

  async store(request: FastifyRequest<{ Body: { name: string } }>, reply: FastifyReply) {
    const { name } = request.body;

    await CategoryRepository.register(name);

    reply.status(201).send({ message: 'Categoria criada com sucesso' });
  }

  async update(
    request: FastifyRequest<{ Params: { id: string }, Body: { name: string } }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;

    const { name } = request.body;

    const category = await CategoryRepository.findById(id);

    if (!category) {
      return reply.status(404).send({ message: 'Categoria não encontrada' });
    }

    await CategoryRepository.update(id, name);

    reply.status(202).send({ message: 'Categoria atualizada com sucesso' });
  }

  async delete(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = request.params;

    const restaurant = await CategoryRepository.findById(id);

    if (!restaurant) {
      return reply.status(404).send({ message: 'Categoria não encontrada' });
    }

    await CategoryRepository.remove(id);

    reply.status(202).send({ message: 'Categoria deletada com sucesso' });
  }
}

export default new CategoryController();
