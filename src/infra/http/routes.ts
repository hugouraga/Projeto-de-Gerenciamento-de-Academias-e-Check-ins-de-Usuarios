import { me } from './controllers/me';
import { register } from './controllers/user';
import { authenticate } from './controllers/authenticate';
import { FastifyInstance } from 'fastify';
import { verifyJWT } from './middlewares/verify-jwt';

export async function appRoutes(app: FastifyInstance) {
  app.post('/session', authenticate);
  app.get('/me', me);
  app.post('/register/user', { onRequest: [verifyJWT] }, register);
}
