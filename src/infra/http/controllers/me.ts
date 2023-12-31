import { FastifyReply, FastifyRequest } from 'fastify';

export async function me(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();
  return reply.status(201).send({ response: 'test jwt' });
}
