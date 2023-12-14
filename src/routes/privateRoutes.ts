import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';

import jwt from 'jsonwebtoken';

export async function privateRoutes(
  request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction
) {
  const token = request.headers.authorization?.split(' ')[1];

  if (!token) {
    return reply.status(401).send({ message: 'Token inválido' });
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const isAdmin = decoded.role.toLowerCase() === 'admin';

  if (!isAdmin) {
    return reply.status(401).send({ message: 'Usuário não autorizado' });
  }

  done();
}
