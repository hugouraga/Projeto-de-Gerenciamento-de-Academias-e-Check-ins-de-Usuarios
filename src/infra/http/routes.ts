import { FastifyInstance } from 'fastify';
import { register } from './controllers/user';

export async function appRoutes(app: FastifyInstance) {
  app.post('/register/user', register);
}
