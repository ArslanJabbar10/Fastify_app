import type { FastifyInstance } from "fastify";
import {
  addASoldProduct,
  getAllSoldProducts,
  deleteASoldProduct,
} from "../controllers/sproduct.controller.ts";

export async function selledProducts(fastify: FastifyInstance) {
  fastify.get("", getAllSoldProducts);
  fastify.post("", {
    schema: {
      body: {
        type: "object",
        required: ["userId", "productId"],
        properties: {
          userId: { type: "string" },
          productId: { type: "string" },
        },
      },
    },
    handler: addASoldProduct,
  });
  fastify.delete("", {
    schema: {
      body: {
        type: "object",
        required: ["sellingId"],
        properties: {
          sellingId: { type: "string" },
        },
      },
    },
    handler: deleteASoldProduct,
  });
}
