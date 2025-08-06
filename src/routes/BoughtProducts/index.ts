import type { FastifyInstance } from "fastify";
import {
  addASoldProduct,
  getAllSoldProducts,
  deleteASoldProduct,
} from "./controller.js";
import { addASoldProductSchema, deleteASoldProductSchema } from "./schema.js";

export async function selledProducts(fastify: FastifyInstance) {
  fastify.get("", getAllSoldProducts);
  fastify.post("", {
    schema: addASoldProductSchema,
    handler: addASoldProduct,
  });
  fastify.delete("", {
    schema: deleteASoldProductSchema,
    handler: deleteASoldProduct,
  });
}
