import * as dotenv from 'dotenv';

import RestaurantController from './app/controllers/RestaurantController';
import { fastify } from './lib/fastify';

dotenv.config();

const port = process.env.PORT || 3333;

fastify.get('/restaurants', RestaurantController.index);
fastify.get('/restaurants/:id', RestaurantController.show);

fastify.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
