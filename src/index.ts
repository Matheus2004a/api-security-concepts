import * as dotenv from 'dotenv';

import CategoryController from './app/controllers/CategoryController';
import ProductsController from './app/controllers/ProductsController';
import RestaurantController from './app/controllers/RestaurantController';
import { fastify } from './lib/fastify';

dotenv.config();

const port = process.env.PORT || 3333;

fastify.get('/restaurants', RestaurantController.index);
fastify.get('/restaurants/:id', RestaurantController.show);
fastify.post('/restaurants', RestaurantController.store);
fastify.patch('/restaurants/:id', RestaurantController.update);
fastify.delete('/restaurants/:id', RestaurantController.delete);

fastify.get('/products', ProductsController.index);
fastify.get('/products/:id', ProductsController.show);

fastify.get('/categories', CategoryController.index);
fastify.get('/categories/:id', CategoryController.show);
fastify.post('/categories', CategoryController.store);
fastify.put('/categories/:id', CategoryController.update);
fastify.delete('/categories/:id', CategoryController.delete);

try {
  fastify.listen({ port });

  console.log(`Server is running at http://localhost:${port}`);
} catch (error) {
  fastify.log.error(error);
}
