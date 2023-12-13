import { FastifyInstance } from 'fastify';
import CategoryController from '../app/controllers/CategoryController';

export async function categoriesRoutes(fastify: FastifyInstance) {
  fastify.get('/categories', CategoryController.index);
  fastify.get('/categories/:id', CategoryController.show);
  fastify.post('/categories', CategoryController.store);
  fastify.put('/categories/:id', CategoryController.update);
  fastify.delete('/categories/:id', CategoryController.delete);
}
