import { FastifyInstance } from 'fastify';
import CategoryController from '../app/controllers/CategoryController';
import { privateRoutes } from './privateRoutes';

export async function categoriesRoutes(fastify: FastifyInstance) {
  fastify.get('/categories', CategoryController.index);
  fastify.get('/categories/:id', CategoryController.show);

  fastify.post('/categories', {
    preHandler: privateRoutes
  }, CategoryController.store);

  fastify.put('/categories/:id', {
    preHandler: privateRoutes
  }, CategoryController.update);

  fastify.delete('/categories/:id', {
    preHandler: privateRoutes
  }, CategoryController.delete);
}
