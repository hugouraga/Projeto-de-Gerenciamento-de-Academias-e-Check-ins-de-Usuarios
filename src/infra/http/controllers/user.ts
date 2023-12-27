import { FastifyReply, FastifyRequest } from 'fastify';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  return reply.status(201).send({ response: 'created user' });
}
