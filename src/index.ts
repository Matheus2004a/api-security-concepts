import rateLimit from '@fastify/rate-limit';
import * as dotenv from 'dotenv';

import { fastify } from './lib/fastify';
import { categoriesRoutes } from './routes/categoriesRoutes';
import { employeesRoutes } from './routes/employeesRoutes';
import { productsRoutes } from './routes/productsRoutes';
import { restaurantsRoutes } from './routes/restaurantsRoutes';

dotenv.config();

const port = process.env.PORT || 3333;

await fastify.register(rateLimit, {
  max: 10,
  timeWindow: 5 * 60 * 1000
});

fastify.register(restaurantsRoutes);
fastify.register(productsRoutes);
fastify.register(categoriesRoutes);
fastify.register(employeesRoutes);

try {
  fastify.listen({ port });

  console.log(`Server is running at http://localhost:${port}`);
} catch (error) {
  fastify.log.error(error);
}
