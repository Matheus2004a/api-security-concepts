import { FastifyInstance } from 'fastify';
import RestaurantController from '../app/controllers/RestaurantController';
import { privateRoutes } from './privateRoutes';

export async function restaurantsRoutes(fastify: FastifyInstance) {
  fastify.get('/restaurants', RestaurantController.index);
  fastify.get('/restaurants/:id', RestaurantController.show);
  fastify.get('/restaurants/:id/products', RestaurantController.productsByRestaurant);

  fastify.post('/restaurants', {
    preHandler: privateRoutes
  }, RestaurantController.store);

  fastify.patch('/restaurants/:id', {
    preHandler: privateRoutes
  }, RestaurantController.update);

  fastify.delete('/restaurants/:id', {
    preHandler: privateRoutes
  }, RestaurantController.delete);
}
