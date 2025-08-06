import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../middleware/prisma.js";
import { randomUUID } from "crypto";
import * as bcrypt from "bcrypt";

export const getAllUsers = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const query_params: any = req.query;
    if (query_params.userId) {
      console.log("1");
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
    console.log("reached");
    const all_users = await prisma.user.findMany();
    return reply.code(200).send(all_users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
  return reply.code(500).send({ message: "Something went wrong" });
};
export const registerUser = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const body: any = req.body;

  if (!body) {
    return reply.code(404).send({ message: "no user data found" });
  }
  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user_exists = await prisma.user.findFirst({
      where: { email: body.email },
    });
    if (user_exists) {
      return reply.code(404).send({ message: "User already registered!" });
    }
    await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        userId: randomUUID(),
      },
    });
    return reply.code(201).send({ message: "User successfully created!" });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
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

export const getSpecificUser = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const body: any = req.body;
    console.log("Request body:", body);

    if (!body.userId) {
      return reply.code(400).send({ message: "Missing userId" });
    }

    const user = await prisma.user.findUnique({
      where: { userId: body.userId },
    });

    if (!user) {
      return reply.code(404).send({ message: "User not found" });
    }

    return reply.code(200).send(user);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
  return reply.code(500).send({ message: "Something went wrong" });
};
