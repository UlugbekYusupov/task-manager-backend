module.exports = {
  paths: {
    "/api/projects": {
      post: {
        summary: "Create a Project",
        description:
          "Creates a new project and assigns the authenticated user as the owner.",
        tags: ["Projects"],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "New Project" },
                  description: {
                    type: "string",
                    example: "This is a sample project",
                  },
                },
                required: ["name"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Project created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      example: "123e4567-e89b-12d3-a456-426614174000",
                    },
                    name: { type: "string", example: "New Project" },
                    description: {
                      type: "string",
                      example: "This is a sample project",
                    },
                    ownerId: { type: "string", example: "user123" },
                    createdAt: { type: "string", format: "date-time" },
                  },
                },
              },
            },
          },
          400: { description: "Invalid request data" },
          401: { description: "Unauthorized" },
        },
      },
      get: {
        summary: "Get All Projects",
        description:
          "Fetches all projects where the authenticated user is a member or an owner.",
        tags: ["Projects"],
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: "List of projects retrieved",
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
                      name: { type: "string", example: "Project A" },
                      description: {
                        type: "string",
                        example: "A sample project",
                      },
                      ownerId: { type: "string", example: "user123" },
                      createdAt: { type: "string", format: "date-time" },
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
    "/api/projects/{projectId}": {
      get: {
        summary: "Get project by ID",
        description:
          "Fetch a specific project by its ID. The user must be a project member.",
        tags: ["Projects"],
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "projectId",
            in: "path",
            required: true,
            schema: { type: "string" },
            example: "123e4567-e89b-12d3-a456-426614174000",
          },
        ],
        responses: {
          200: { description: "Project retrieved successfully" },
          403: { description: "Unauthorized access" },
          404: { description: "Project not found" },
        },
      },
      put: {
        summary: "Update project",
        description: "Update project details. Only project owners can update.",
        tags: ["Projects"],
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "projectId",
            in: "path",
            required: true,
            schema: { type: "string" },
            example: "123e4567-e89b-12d3-a456-426614174000",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Updated Project Name" },
                  description: {
                    type: "string",
                    example: "Updated project description",
                  },
                  status: {
                    type: "string",
                    enum: ["ACTIVE", "INACTIVE"],
                    example: "ACTIVE",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Project updated successfully" },
          403: { description: "Unauthorized" },
          404: { description: "Project not found" },
        },
      },
      delete: {
        summary: "Delete project",
        description: "Deletes a project. Only the owner can delete it.",
        tags: ["Projects"],
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "projectId",
            in: "path",
            required: true,
            schema: { type: "string" },
            example: "123e4567-e89b-12d3-a456-426614174000",
          },
        ],
        responses: {
          200: { description: "Project deleted successfully" },
          403: { description: "Unauthorized" },
          404: { description: "Project not found" },
        },
      },
    },
    "/api/projects/{projectId}/members": {
      post: {
        summary: "Add a member to a project",
        description: "Project owners can add members using their email.",
        tags: ["Projects"],
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "projectId",
            in: "path",
            required: true,
            schema: { type: "string" },
            example: "123e4567-e89b-12d3-a456-426614174000",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", example: "user@example.com" },
                },
                required: ["email"],
              },
            },
          },
        },
        responses: {
          201: { description: "Member added successfully" },
          400: { description: "User already in project" },
          403: { description: "Unauthorized" },
          404: { description: "User not found" },
        },
      },
    },
    "/api/projects/{projectId}/tasks": {
      get: {
        summary: "Get all tasks in a project",
        description:
          "Retrieve all tasks associated with a project. Only members can access.",
        tags: ["Projects"],
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "projectId",
            in: "path",
            required: true,
            schema: { type: "string" },
            example: "123e4567-e89b-12d3-a456-426614174000",
          },
        ],
        responses: {
          200: { description: "Tasks retrieved successfully" },
          403: { description: "Unauthorized" },
        },
      },
      post: {
        summary: "Create a new task",
        description: "Allows project owners to create tasks.",
        tags: ["Projects"],
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "projectId",
            in: "path",
            required: true,
            schema: { type: "string" },
            example: "123e4567-e89b-12d3-a456-426614174000",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", example: "New Task" },
                  description: { type: "string", example: "Task details" },
                  type: {
                    type: "string",
                    enum: ["BUG", "STORY"],
                    example: "STORY",
                  },
                  priority: {
                    type: "string",
                    enum: ["LOW", "MEDIUM", "HIGH"],
                    example: "HIGH",
                  },
                },
                required: ["title", "type", "priority"],
              },
            },
          },
        },
        responses: {
          201: { description: "Task created successfully" },
          403: { description: "Unauthorized" },
        },
      },
    },
    "/api/projects/{projectId}/tasks/{taskId}": {
      put: {
        summary: "Update a task",
        description: "Allows members or owners to update task details.",
        tags: ["Projects"],
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "projectId",
            in: "path",
            required: true,
            schema: { type: "string" },
            example: "123e4567-e89b-12d3-a456-426614174000",
          },
          {
            name: "taskId",
            in: "path",
            required: true,
            schema: { type: "string" },
            example: "task123e4567-e89b-12d3-a456-426614174000",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", example: "Updated Task" },
                  status: {
                    type: "string",
                    enum: ["OPEN", "IN_PROGRESS", "DONE"],
                    example: "IN_PROGRESS",
                  },
                  priority: {
                    type: "string",
                    enum: ["LOW", "MEDIUM", "HIGH"],
                    example: "MEDIUM",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Task updated successfully" },
          403: { description: "Unauthorized" },
          404: { description: "Task not found" },
        },
      },
    },
  },
};
