const express = require("express")
const dotenv = require("dotenv")
const SwaggerConfig = require("./src/config/swagger.config")
const mainRouter = require("./src/app.routes")
const NotFoundHandler = require("./src/common/exception/notfound.handler")
const AllExceptionHandler = require("./src/common/exception/all-exception.handler")
dotenv.config()
async function main() {
    const app = express()
    const port = process.env.PORT
    require("./src/config/mongoose.config")
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(mainRouter)
    SwaggerConfig(app)
    NotFoundHandler(app);
    AllExceptionHandler(app);
    app.listen(port, () => {
        console.log(`Server: http://localhost:${port}`);
    })
}
main();