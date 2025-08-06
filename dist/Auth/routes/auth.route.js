import { loginHandler } from "../controller/auth.controller.js";
export async function login(fastify) {
    fastify.post("", {
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
        handler: loginHandler,
    });
}
