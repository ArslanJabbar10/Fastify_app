import { getAllUsers, registerUser, deleteUser, } from "../controllers/user.controller.js";
export async function userRoutes(fastify) {
    fastify.get("/users", {
        handler: getAllUsers,
    });
    fastify.post("", {
        // preValidation: [fastify.authenticate],
        schema: {
            body: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: { type: "string" },
                    password: { type: "string" },
                },
            },
        },
        handler: registerUser,
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
