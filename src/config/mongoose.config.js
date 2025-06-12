const {default: mongoose} = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected to DB...")
}).catch(err => {
    console.log(err?.message ?? "Failed DB Connection!!!")
})