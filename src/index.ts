import * as dotenv from 'dotenv';

import CategoryController from './app/controllers/CategoryController';
import EmployeeController from './app/controllers/EmployeeController';
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
fastify.post('/products', ProductsController.store);
fastify.patch('/products/:id', ProductsController.update);
fastify.delete('/products/:id', ProductsController.delete);

fastify.get('/categories', CategoryController.index);
fastify.get('/categories/:id', CategoryController.show);
fastify.post('/categories', CategoryController.store);
fastify.put('/categories/:id', CategoryController.update);
fastify.delete('/categories/:id', CategoryController.delete);

fastify.get('/employees', EmployeeController.index);
fastify.get('/employees/:id', EmployeeController.show);
fastify.post('/employees', EmployeeController.store);
fastify.post('/employees/login', EmployeeController.login);
fastify.put('/employees/:id', EmployeeController.update);
fastify.delete('/employees/:id', EmployeeController.delete);

try {
  fastify.listen({ port });

  console.log(`Server is running at http://localhost:${port}`);
} catch (error) {
  fastify.log.error(error);
}
