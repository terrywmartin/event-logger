const express = require("express");
const router = express.Router();
const swagger = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Event API",
      version: "1.0.0",
      description:
        `Send and retrieve events`,
      license: {
        name: "MIT",
        url: "https://choosealicense.com/licenses/mit/",
      },
    },
    externalDocs: {
      description: "swagger.json",
      url: "swagger.json"
    },
  },
  apis: [ "./routes/auth.js", "./routes/events.js", "./routes/projects.js"],
};
const specs = swagger(swaggerOptions);

router.use("/", swaggerUi.serve);
router.get(
  "/",
  swaggerUi.setup(specs, {
    explorer: true,
  })
);
router.get(
  "/swagger.json", (req, res) => {
  res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  }
);

module.exports = router;