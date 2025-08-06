import { fastify, type FastifyInstance } from "fastify";
import {
  getAllUsers,
  registerUser,
  deleteUser,
  getSpecificUser,
} from "./controller.js";
import {
  deleteUserSchema,
  getSpecificUserSchema,
  registerUserSchema,
} from "./schema.js";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get("", {
    preValidation: [(fastify as any).authenticate],
    handler: getAllUsers,
  });
  fastify.post("", {
    schema: registerUserSchema,
    handler: registerUser,
  });

  fastify.delete("", {
    schema: deleteUserSchema,
    handler: deleteUser,
  });
  fastify.post("/specific", {
    schema: getSpecificUserSchema,
    handler: getSpecificUser,
  });
}
