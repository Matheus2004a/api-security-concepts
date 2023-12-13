import { FastifyInstance } from 'fastify';
import RestaurantController from '../app/controllers/RestaurantController';

export async function restaurantsRoutes(fastify: FastifyInstance) {
  fastify.get('/restaurants', RestaurantController.index);
  fastify.get('/restaurants/:id', RestaurantController.show);
  fastify.post('/restaurants', RestaurantController.store);
  fastify.patch('/restaurants/:id', RestaurantController.update);
  fastify.delete('/restaurants/:id', RestaurantController.delete);
}
