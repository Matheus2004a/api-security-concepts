import { FastifyInstance } from 'fastify';
import EmployeeController from '../app/controllers/EmployeeController';
import { privateRoutes } from './privateRoutes';

export async function employeesRoutes(fastify: FastifyInstance) {
  fastify.get('/employees', EmployeeController.index);
  fastify.get('/employees/:id', EmployeeController.show);

  fastify.post('/employees', {
    preHandler: privateRoutes
  }, EmployeeController.store);

  fastify.post('/employees/login', EmployeeController.login);

  fastify.put('/employees/:id', {
    preHandler: privateRoutes
  }, EmployeeController.update);

  fastify.delete('/employees/:id', {
    preHandler: privateRoutes
  }, EmployeeController.delete);
}
