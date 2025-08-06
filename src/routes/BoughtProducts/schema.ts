export const addASoldProductSchema = {
  body: {
    type: "object",
    required: ["userId", "productId"],
    properties: {
      userId: { type: "string" },
      productId: { type: "string" },
    },
  },
};

export const deleteASoldProductSchema = {
  body: {
    type: "object",
    required: ["sellingId"],
    properties: {
      sellingId: { type: "string" },
    },
  },
};
