import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma.ts";
import { randomUUID } from "crypto";

export const getAllProducts = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const query_params: any = req.query;
    if (query_params) {
      const all_users = await prisma.products.findMany({
        where: {
          productId: String(query_params.productId),
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
    const all_prodcuts = await prisma.products.findMany();

    return reply.code(200).send(all_prodcuts);
  } catch (err) {
    console.log(err);
  }
  return reply.code(404).send({ message: "An error occurred" });
};

export const addProduct = async (req: FastifyRequest, reply: FastifyReply) => {
  const body: any = req.body;
  try {
    const new_prodcut = await prisma.products.create({
      data: {
        name: body.name,
        price: body.price,
        productId: randomUUID(),
      },
    });
    return reply.code(201).send(new_prodcut);
  } catch (err) {
    console.log("error: ", err);
  }
  return reply.code(404).send("An error occurred");
};
export const changeProduct = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const body: any = req.body;
  const product_exists = await prisma.products.findFirst({
    where: {
      productId: body.productId,
    },
  });
  try {
    if (product_exists) {
      const new_prodcut = await prisma.products.update({
        where: {
          productId: body.productId,
        },
        data: {
          name: body.newName,
          price: body.newPrice,
          productId: body.productId,
        },
      });
      return reply.code(201).send(new_prodcut);
    } else {
      return reply
        .code(404)
        .send({ message: `product with id ${body.productId} not found` });
    }
  } catch (err) {
    console.log("error: ", err);
  }
  return reply.code(404).send({ "message ": "An error occurred" });
};
export const deleteProduct = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const body: any = req.body;
  const product_exists = await prisma.products.findFirst({
    where: {
      productId: body.productId,
    },
  });
  try {
    if (product_exists) {
      await prisma.products.delete({
        where: {
          productId: body.productId,
        },
      });
      return reply.code(201).send({ message: "Successfully deleted" });
    } else {
      return reply
        .code(200)
        .send({ message: `product with id ${body.productId} not found` });
    }
  } catch (err) {
    console.log("error: ", err);
  }
  return reply.code(404).send("An error occurred");
};
