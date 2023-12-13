import { FastifyReply, FastifyRequest } from 'fastify';

import jwt from 'jsonwebtoken';

export async function privateRoutes(request: FastifyRequest, reply: FastifyReply) {
  const token = request.headers.authorization?.split(' ')[1];

  if (!token) {
    return reply.status(403).send({ message: 'Token inválido' });
  }

  const decoded = jwt.decode(token);

  const isAdmin = decoded.role.toLowerCase() === 'admin';

  if (!isAdmin) {
    return reply.status(401).send({ message: 'Usuário não autorizado' });
  }
}
