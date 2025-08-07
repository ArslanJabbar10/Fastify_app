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
  fastify.get("/allProducts", getAllProducts);
  fastify.post("/addProduct", {
    schema: addProductSchema,
    handler: addProduct,
  });
  fastify.put("/changeDetail", {
    schema: changeProductSchema,
    handler: changeProduct,
  });
  fastify.delete("deleteProduct", {
    schema: deleteProductSchema,
    handler: deleteProduct,
  });
}
