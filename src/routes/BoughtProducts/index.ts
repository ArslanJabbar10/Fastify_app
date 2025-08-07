import type { FastifyInstance } from "fastify";
import {
  addASoldProduct,
  getAllSoldProducts,
  deleteASoldProduct,
  getMyProducts,
} from "./controller.js";
import { addASoldProductSchema, deleteASoldProductSchema } from "./schema.js";

export async function selledProducts(fastify: FastifyInstance) {
  fastify.get("/allSoldProducts", getAllSoldProducts);
  fastify.post("/addSoldProduct", {
    schema: addASoldProductSchema,
    handler: addASoldProduct,
  });
  fastify.delete("/deleteASoldProduct", {
    schema: deleteASoldProductSchema,
    handler: deleteASoldProduct,
  });
  fastify.get("/myProducts", {
    preValidation: [(fastify as any).authenticate],
    handler: getMyProducts,
  });
}
