import 'dotenv';
import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { appRoutes } from './infra/http/routes';

export const app = fastify();

app.register(fastifyJwt, {
  secret: process.env.JWT_TOKEN ?? '',
});
app.register(appRoutes);
