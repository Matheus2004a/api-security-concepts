import { FastifyInstance } from 'fastify';
import ProductsController from '../app/controllers/ProductsController';
import { privateRoutes } from './privateRoutes';

export async function productsRoutes(fastify: FastifyInstance) {
  fastify.get('/products', ProductsController.index);
  fastify.get('/products/:id', ProductsController.show);

  fastify.post('/products', {
    preHandler: privateRoutes
  }, ProductsController.store);

  fastify.patch('/products/:id', {
    preHandler: privateRoutes
  }, ProductsController.update);

  fastify.delete('/products/:id', {
    preHandler: privateRoutes
  }, ProductsController.delete);
}
