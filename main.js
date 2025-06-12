const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
async function main() {
    const app = express()
    const port = process.env.PORT
    require("./src/config/mongoose.config")
    app.listen(port, () => {
        console.log(`Server: http://localhost:${port}`);
    })
}
main();