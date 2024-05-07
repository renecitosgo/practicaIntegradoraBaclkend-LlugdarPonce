const express = require("express")

const handlebars = require("express-handlebars")
const viewsRouter = require("./routes/views.router.js")
const usersRouter = require("./routes/api/users.router.js")

const { connectDB } = require("./config/index.js")


const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    console.log('Body:', req.body)
    next()
})


app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+"/public"))

app.engine("hbs", handlebars.engine({
    extname: ".hbs"
}))
app.set("views", __dirname+"/views")
app.set("view engine", "hbs")

// urbase/products -> html con productos
// urbase/users


connectDB()


app.use("/", viewsRouter)
// url-base/api/products -> json
app.use("/api/users", usersRouter)

app.listen (PORT, err => {
    if (err)console.log("error: ", err)
    console.log(`listener on port: ${PORT}`)
})