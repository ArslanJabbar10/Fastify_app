import type { FastifyInstance } from "fastify";
import {
  getAllProducts,
  addProduct,
  changeProduct,
  deleteProduct,
} from "../controllers/product.controller.ts";

export async function allProducts(fastify: FastifyInstance) {
  fastify.get("", getAllProducts);
  fastify.post("", {
    schema: {
      body: {
        type: "object",
        required: ["name", "price"],
        properties: {
          name: { type: "string" },
          price: { type: "number" },
        },
      },
    },
    handler: addProduct,
  });
  fastify.put("", {
    schema: {
      body: {
        type: "object",
        required: ["productId", "newPrice", "newName"],
        properties: {
          productId: { type: "string" },
          newPrice: { type: "number" },
          newName: { type: "string" },
        },
      },
    },
    handler: changeProduct,
  });
  fastify.delete("", {
    schema: {
      body: {
        type: "object",
        required: ["productId"],
        properties: {
          productId: { type: "string" },
        },
      },
    },
    handler: deleteProduct,
  });
}
