import type { FastifyInstance } from "fastify";
import {
  getAllProducts,
  addProduct,
  changeProduct,
  deleteProduct,
} from "./controller.js";
import {
  addProductSchema,
  changeProductSchema,
  deleteProductSchema,
} from "./schema.js";

export async function allProducts(fastify: FastifyInstance) {
  fastify.get("", getAllProducts);
  fastify.post("", {
    schema: addProductSchema,
    handler: addProduct,
  });
  fastify.put("", {
    schema: changeProductSchema,
    handler: changeProduct,
  });
  fastify.delete("", {
    schema: deleteProductSchema,
    handler: deleteProduct,
  });
}
