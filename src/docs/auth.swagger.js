module.exports = {
  paths: {
    "/api/auth/register": {
      post: {
        summary: "User Registration",
        description: "Registers a new user with email, username, and password.",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: { type: "string", example: "john_doe" },
                  email: { type: "string", example: "john@example.com" },
                  password: { type: "string", example: "StrongPassword123!" },
                },
                required: ["username", "email", "password"],
              },
            },
          },
        },
        responses: {
          201: { description: "User registered successfully" },
          400: { description: "Email or username already in use" },
        },
      },
    },
    "/api/auth/login": {
      post: {
        summary: "User Login",
        description: "Logs in a user and returns a JWT token.",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", example: "john@example.com" },
                  password: { type: "string", example: "StrongPassword123!" },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Login successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: { type: "string", example: "jwt_token_here" },
                    id: {
                      type: "string",
                      example: "123e4567-e89b-12d3-a456-426614174000",
                    },
                  },
                },
              },
            },
          },
          401: { description: "Invalid credentials" },
        },
      },
    },
    "/api/auth/profile": {
      get: {
        summary: "Get User Profile",
        description: "Fetches the authenticated user's profile information.",
        tags: ["Auth"],
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: "User profile retrieved",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      example: "123e4567-e89b-12d3-a456-426614174000",
                    },
                    username: { type: "string", example: "john_doe" },
                    email: { type: "string", example: "john@example.com" },
                  },
                },
              },
            },
          },
          401: { description: "Unauthorized" },
        },
      },
    },
    "/api/auth/users": {
      get: {
        summary: "Get All Users",
        description:
          "Retrieves a list of all registered users. Requires authentication.",
        tags: ["Auth"],
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: "List of users retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        example: "123e4567-e89b-12d3-a456-426614174000",
                      },
                      username: { type: "string", example: "john_doe" },
                      email: { type: "string", example: "john@example.com" },
                    },
                  },
                },
              },
            },
          },
          401: { description: "Unauthorized" },
        },
      },
    },
  },
};
