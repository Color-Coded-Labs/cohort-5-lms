import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CCL LMS API Documentation",
      version: "1.0.0",
      description: "Documentation for the CCL LMS API",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
