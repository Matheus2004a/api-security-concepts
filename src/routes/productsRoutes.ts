import { FastifyInstance } from 'fastify';
import ProductsController from '../app/controllers/ProductsController';

export async function productsRoutes(fastify: FastifyInstance) {
  fastify.get('/products', ProductsController.index);
  fastify.get('/products/:id', ProductsController.show);
  fastify.post('/products', ProductsController.store);
  fastify.patch('/products/:id', ProductsController.update);
  fastify.delete('/products/:id', ProductsController.delete);
}
