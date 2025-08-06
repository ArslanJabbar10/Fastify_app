export const addProductSchema = {
  body: {
    type: "object",
    required: ["name", "price"],
    properties: {
      name: { type: "string" },
      price: { type: "number" },
    },
  },
};

export const changeProductSchema = {
  body: {
    type: "object",
    required: ["productId", "newPrice", "newName"],
    properties: {
      productId: { type: "string" },
      newPrice: { type: "number" },
      newName: { type: "string" },
    },
  },
};

export const deleteProductSchema = {
  body: {
    type: "object",
    required: ["productId"],
    properties: {
      productId: { type: "string" },
    },
  },
};
