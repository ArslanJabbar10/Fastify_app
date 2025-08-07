import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../middleware/prisma.js";
import { randomUUID } from "crypto";

interface JWTPayload {
  id: string;
}

export const getAllSoldProducts = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const query_params: any = req.query;
    if (query_params.sellingId) {
      const all_users = await prisma.productsBought.findMany({
        where: {
          sellingId: String(query_params.sellingId),
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
    const all_sold_products = await prisma.productsBought.findMany();

    return reply.code(200).send(all_sold_products);
  } catch (err) {
    console.log("error", err);
  }
  return reply
    .code(404)
    .send({ message: "An error occurred to fetch all sold products" });
};

export const addASoldProduct = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const body: any = req.body;
  try {
    const new_data = await prisma.productsBought.create({
      data: {
        userId: body.userId,
        productId: body.productId,
        sellingId: randomUUID(),
      },
    });
    return reply.code(201).send(new_data);
  } catch (err) {
    console.log("error", err);
  }
  return reply
    .code(404)
    .send({ message: "An error occurred to add a sold products" });
};
export const deleteASoldProduct = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const body: any = req.body;
  try {
    const product_exists = await prisma.productsBought.findFirst({
      where: {
        sellingId: body.sellingId,
      },
    });

    if (product_exists) {
      await prisma.productsBought.delete({
        where: {
          sellingId: body.sellingId,
        },
      });
    } else {
      return reply.code(404).send({ message: "Incorrect data sent" });
    }
  } catch (err) {
    console.log("err", err);
  }
};

export const getMyProducts = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const user = req.user as JWTPayload;
  const user_id = user.id;
  try {
    const my_products = await prisma.productsBought.findMany({
      where: { userId: user_id },
    });
    return reply.code(200).send(my_products);
  } catch (err) {
    console.log("error", err);
  }
  return reply.code(404).send({
    message: "An unknown error occurred while getting user products!",
  });
};
