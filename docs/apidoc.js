import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Contact Management RESTful API",
      version: "1.0.0",
      description: "OpenAPI for Contact Management RESTful API",
      termsOfService: "https://github.com/mazufik",
      contact: {
        name: "Taufik Rahman",
        email: "taufikprincecode10@gmail.com",
        url: "https://github.com/mazufik",
      },
      license: {
        name: "APACHE 2.0",
        url: "https://www.apache.org/licenses/LICENSE-2.0.html",
      },
    },
    servers: [
      {
        description: "Contact Management RESTful API Server",
        url: "http://127.0.0.1/api",
      },
    ],
    paths: {
      "/users": {
        post: {
          tags: ["Users"],
          summary: "Create a new user",
          description: "Create a new user for login",
          requestBody: {
            required: true,
            content: {
              "applicaiton/json": {
                schema: {
                  type: "object",
                  properties: {
                    username: {
                      type: "string",
                      maxLength: 100,
                      required: true,
                    },
                    password: {
                      type: "string",
                      maxLength: 100,
                      required: true,
                    },
                    name: {
                      type: "string",
                      maxLength: 100,
                      required: true,
                    },
                  },
                },
                examples: {
                  examples: {
                    description: "Example create new user",
                    value: {
                      username: "test",
                      password: "test123",
                      name: "Test Name",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Success create a new user",
              content: {
                "applicaiton/json": {
                  schema: {
                    type: "object",
                    properties: {
                      username: {
                        type: "string",
                      },
                      name: {
                        type: "string",
                      },
                    },
                  },
                  examples: {
                    examples: {
                      description: "Success create a new user",
                      value: {
                        data: {
                          username: "test",
                          name: "Test Name",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/users/login": {
        post: {
          tags: ["Users"],
          summary: "Login user",
          description: "Login user for other fiturs",
          responses: {},
        },
      },
      "/users/current": {
        get: {
          tags: ["Users"],
          summary: "Get user",
          description: "Get active user after login",
          responses: {},
        },
        patch: {
          tags: ["Users"],
          summary: "Update existing user",
          description: "Update existing user in database",
          responses: {},
        },
      },
      "/users/logout": {
        delete: {
          tags: ["Users"],
          summary: "Delete existing user",
          description: "Delete existing user in database",
          responses: {},
        },
      },
    },
  },
  apis: ["/src/route/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
