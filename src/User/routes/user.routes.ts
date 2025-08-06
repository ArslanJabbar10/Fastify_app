import type { FastifyInstance } from "fastify";
import {
  getAllUsers,
  createUser,
  changeUserInfo,
  deleteUser,
} from "../controllers/user.controller.ts";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get("", getAllUsers);
  fastify.post("", {
    schema: {
      body: {
        type: "object",
        required: ["name", "age"],
        properties: {
          name: { type: "string" },
          age: { type: "number" },
        },
      },
    },
    handler: createUser,
  });
  fastify.put("", {
    schema: {
      body: {
        type: "object",
        required: ["userId", "updateName", "updateAge"],
        properties: {
          userId: { type: "number" },
          updateName: { type: "string" },
          updateAge: { type: "number" },
        },
      },
    },
    handler: changeUserInfo,
  });
  fastify.delete("", {
    schema: {
      body: {
        type: "object",
        required: ["userId"],
        properties: {
          userId: { type: "string" },
        },
      },
    },
    handler: deleteUser,
  });
}
