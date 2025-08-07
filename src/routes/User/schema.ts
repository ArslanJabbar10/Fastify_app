export const registerUserSchema = {
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string" },
      password: { type: "string" },
    },
  },
};

export const deleteUserSchema = {
  body: {
    type: "object",
    required: ["userId"],
    properties: {
      userId: { type: "string" },
    },
  },
};
