import { AuthenticateUseCase } from '@/application/use-cases/authenticate-user';
import { PrismaRegisterUsersRepository } from '@/infra/database/prisma/prisma-users.repository';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { email, password }: any = request.body;
    const userRepository = new PrismaRegisterUsersRepository();
    const userUseCase = new AuthenticateUseCase(userRepository);
    const { user } = await userUseCase.execute({ email, password });
    const token = await reply.jwtSign({}, { sign: { sub: user.id } });
    return reply.status(200).send({ token });
  } catch (err) {
    return reply.status(404).send({ msg: err });
  }
}
