import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../middleware/prisma.js";
import * as bcrypt from "bcrypt";

export const loginHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const body: any = req.body;
  const user = await prisma.user.findUnique({ where: { email: body.email } });
  if (!user) {
    return reply.status(401).send({ message: "Invalid email" });
  }
  const isPasswordValid = await bcrypt.compare(body.password, user.password);
  if (!isPasswordValid) {
    return reply.code(404).send({ message: "Invalid password" });
  }
  const token = await reply.jwtSign(
    { id: user.userId }
    // { expiresIn: "1h" } // optional
  );
  return reply.code(200).send({ token: token });
};
