const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

function SwaggerConfig(app){
    const swaggerDocument = swaggerJsDoc({
        swaggerDefinition: {
        info : {
            title: "Real Estate",
            description: "Real Estate Consulting",
            version: "1.0.0"
        }
        },
        apis: []
    });
   const Swagger = swaggerUi.setup(swaggerDocument, {});
    app.use("/" , swaggerUi.serve , Swagger)
}

module.exports = SwaggerConfig