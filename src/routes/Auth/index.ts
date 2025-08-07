import type { FastifyInstance } from "fastify";
import { loginHandler } from "./controller.js";
import { loginSchema } from "./schema.js";

export async function login(fastify: FastifyInstance) {
  fastify.post("/login", {
    schema: loginSchema,
    handler: loginHandler,
  });
}
