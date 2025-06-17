const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

function SwaggerConfig(app){
    const swaggerDocument = swaggerJsDoc({
        swaggerDefinition: {
        openapi: "3.0.1",
        info : {
            title: "Real Estate",
            description: "Real Estate Consulting",
            version: "1.0.0"
        }
        },
        apis: [process.cwd() + "/src/modules/**/*.swagger.js"]
    });
   const Swagger = swaggerUi.setup(swaggerDocument, {});
    app.use("/api" , swaggerUi.serve , Swagger)
}

module.exports = SwaggerConfig