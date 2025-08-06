import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma.ts";
import { randomUUID } from "crypto";

export const getAllUsers = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const query_params: any = req.query;
    if (query_params) {
      const all_users = await prisma.user.findMany({
        where: {
          userId: String(query_params.userId),
        },
      });
      if (all_users.length > 0) {
        return reply.code(200).send(all_users);
      } else {
        return reply
          .code(404)
          .send({ message: "Wrong value in query parameter" });
      }
    }
    const all_users = await prisma.user.findMany();
    return reply.code(200).send(all_users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
  return reply.code(500).send({ message: "Something went wrong" });
};
export const createUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const body: any = req.body;

  if (!body) {
    return reply.code(404).send({ message: "no data found" });
  }
  try {
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        age: body.age,
        userId: randomUUID(),
      },
    });
    return reply.code(201).send(newUser);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export const changeUserInfo = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const body: any = req.body;
  const userExists = await prisma.user.findFirst({
    where: { userId: body.userId },
  });
  try {
    if (userExists) {
      const updated_user = await prisma.user.update({
        where: {
          userId: body.userId,
        },
        data: {
          name: body.updateName,
          age: body.updateAge,
        },
      });
      return reply.code(201).send(updated_user);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
  return reply.code(404).send({ error: "This user id does not exist" });
};

export const deleteUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const body: any = req.body;
  const user_exists = await prisma.user.findFirst({
    where: { userId: body.userId },
  });
  try {
    if (user_exists) {
      await prisma.user.delete({ where: { userId: body.userId } });
      return reply
        .code(200)
        .send({ message: `User with id ${body.userId} deleted successfully` });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
  return reply.code(404).send({ error: "user not found!" });
};
