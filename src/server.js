const express = require("express")

const handlebars = require("express-handlebars")
const viewsRouter = require("./routes/views.router.js")
const pruebasRouter = require ("./routes/api/pruebas.js")
const sessionsRouter = require ("./routes/api/session.router.js")

const usersRouter = require("./routes/api/users.router.js")
const productsRouter = require("./routes/api/products.router")
const cartsRouter = require("./routes/api/carts.router.js")
const ordersRouter = require("./routes/api/orders.router.js")

const cookieParser = require("cookie-parser")

const session = require("express-session")


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
app.use(cookieParser("s3cr3t@Firma"))
app.use(session({
    secret: "s3cr3tC@d3r",
    resave: true,
    saveUninitialized: true,
    
}))


app.engine("hbs", handlebars.engine({
    extname: ".hbs"
}))
app.set("views", __dirname+"/views")
app.set("view engine", "hbs")

connectDB()


app.use("/", viewsRouter)
app.use("/pruebas", pruebasRouter)
app.use("/api/products", productsRouter)
app.use("/api/users", usersRouter)
app.use("/api/cart", cartsRouter)
app.use("/api/orders", ordersRouter)
app.use("/api/sessions", sessionsRouter)

app.listen (PORT, err => {
    if (err)console.log("error: ", err)
    console.log(`listener on port: ${PORT}`)
})


// 