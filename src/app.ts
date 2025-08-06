// src/app.ts
import Fastify from "fastify";
import { userRoutes } from "./User/routes/user.routes.ts";
import { allProducts } from "./Products/routes/product.route.ts";
import { selledProducts } from "./BoughtProducts/routes/sproduct.route.ts";

const app = Fastify({
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

// Register routes
app.register(userRoutes, { prefix: "/users" });
app.register(allProducts, { prefix: "/product" });
app.register(selledProducts, { prefix: "/sold_products" });

export default app;
