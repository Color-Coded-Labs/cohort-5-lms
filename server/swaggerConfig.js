import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Color Coded Labs LMS",
      version: "1.0.0",
      description: "Documentation for the CCL LMS API",
    },
    servers: [
      {
        url: "https://cohort-5-lms.onrender.com/api/v1/",
        description: "Production Server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
