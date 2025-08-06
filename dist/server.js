import Fastify from "fastify";
import { userRoutes } from "./User/routes/user.routes.js";
import { allProducts } from "./Products/routes/product.route.js";
import { selledProducts } from "./BoughtProducts/routes/sproduct.route.js";
import fastifyJwt from "@fastify/jwt";
import { login } from "./Auth/routes/auth.route.js";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
const server = Fastify({
    logger: {
        transport: {
            target: "pino-pretty",
            options: {
                translateTime: "SYS:standard",
                ignore: "pid,hostname",
            },
        },
    },
    ajv: {
        customOptions: {
            coerceTypes: false,
        },
    },
});
server.register(fastifyJwt, {
    secret: "supersecret", // In production, store in ENV variable
});
server.decorate("authenticate", async function (request, reply) {
    try {
        await request.jwtVerify();
    }
    catch (err) {
        return reply.code(401).send({ message: "Unauthorized" });
    }
});
await server.register(swagger, {
    openapi: {
        info: {
            title: "Fastify JWT API",
            version: "1.0.0",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
});
await server.register(swaggerUI, {
    routePrefix: "/docs", // Swagger UI will be served at http://localhost:3000/docs
});
// Register routes
server.register(login, { prefix: "/auth" });
server.register(userRoutes, { prefix: "/users" });
server.register(allProducts, { prefix: "/product" });
server.register(selledProducts, { prefix: "/sold_products" });
server.get("/health", async (request, reply) => {
    reply.status(200).send({ status: "Bluesky Backend Application is Running" });
});
server.get("/", async (request, reply) => {
    reply.redirect("/health");
});
server.listen({ host: "0.0.0.0", port: 3000 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
// Optional: Handle uncaught errors for debugging
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason);
});
