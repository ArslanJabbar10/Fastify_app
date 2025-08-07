import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../middleware/prisma.js";
import { randomUUID } from "crypto";
import * as bcrypt from "bcrypt";

interface JWTPayload {
  id: string;
}

export const getAllUsers = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
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
  const user = req.user as JWTPayload;
  const user_id = user.id;
  try {
    const user_details = await prisma.user.findUnique({
      where: { userId: user_id },
    });
    return reply.code(200).send(user_details);
  } catch (err) {
    console.log("error", err);
  }
  return reply.code(404).send({
    message: "An error occurred while getting user details!",
  });
};
