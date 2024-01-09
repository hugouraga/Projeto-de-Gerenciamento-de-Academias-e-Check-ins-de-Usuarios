import fastify from 'fastify';
import { appRoutes } from './infra/http/routes';
import fastifyJwt from '@fastify/jwt';
import 'dotenv';

export const app = fastify();

app.register(fastifyJwt, {
  secret: '',
});
app.register(appRoutes);
