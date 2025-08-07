import { type FastifyInstance } from "fastify";
import {
  getAllUsers,
  registerUser,
  deleteUser,
  getSpecificUser,
} from "./controller.js";
import { deleteUserSchema, registerUserSchema } from "./schema.js";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get("/allUsers", {
    handler: getAllUsers,
  });
  fastify.post("/register", {
    schema: registerUserSchema,
    handler: registerUser,
  });

  fastify.delete("delete", {
    schema: deleteUserSchema,
    handler: deleteUser,
  });
  fastify.get("/details", {
    preValidation: [(fastify as any).authenticate],
    handler: getSpecificUser,
  });
}
