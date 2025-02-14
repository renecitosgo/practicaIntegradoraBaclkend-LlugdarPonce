const express = require("express")

const handlebars = require("express-handlebars")
const viewsRouter = require("./routes/views.router.js")
const pruebasRouter = require ("./routes/api/pruebas.js")
// const sessionsRouter = require ("./routes/api/session.router.js")
const SessionRouter = require ("./routes/api/session.js")

const usersRouter = require("./routes/api/users.router.js")
const productsRouter = require("./routes/api/products.router.js")
const cartsRouter = require("./routes/api/carts.router.js")
const ordersRouter = require("./routes/api/orders.router.js")

const cookieParser = require("cookie-parser")

const session = require("express-session")
// const FileStore = require("session-file-store") "no usaremos FS para las sesiones"
const MongoStore = require("connect-mongo") /*si usaremos sessions con MongoDb persistencia en base datos*/

//Estrategias con passport
const passport = require ("passport")
const initializePassport = require ("./config/passport.config.js")











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


// session en memoria------------
// app.use(session({
//     secret: "s3cr3tC@d3r",
//     resave: true,
//     saveUninitialized: true,
// }))
// session en memoria------------



// session con FS persistencia en datos: "no usaremos FS para las sesiones"-----------------

// const fileStorage = FileStore(session)
// app.use(session({
//     store: new fileStorage({
//         path: "./sessions",
//         ttl: 100,
//         retries: 0,
//     }),

//     secret: "s3cr3tC@d3r",
//     resave: true,
//     saveUninitialized: true,
// }))
// session con FS persistencia en datos: "no usaremos FS para las sesiones"-----------------

// si se va a trabajar con JWT no es necesario sesion...ni de mongo ni de passport. SESION NO
// session con Mongo db-------------------------COMIENZO
// app.use(session({
//     store: MongoStore.create({
//         mongoUrl: "mongodb://127.0.0.1:27017/c53145",
//         ttl: 60 * 60 * 1000 * 24
//     }),
//     secret: "s3cr3tC@d3r",
//     resave: true,
//     saveUninitialized: true
// }))

// session con Mongo db-------------------------FIN



//passport---------------------- comienzo

// Inicializar estrategia de Passport
initializePassport()
// console.log("Estrategias registradas:", passport._strategies);


// Inicializar Passport
    app.use(passport.initialize())
    // app.use(passport.session())

//passport---------------------------fin



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
// http://localhost:8080/api/sessions/githubcallback
// app.use("/api/sessions", sessionsRouter)
// con la clase SessionsRouter (debemos instanciar la clase, aqui o en la exportacion de la misma)


console.log("Rutas registradas en SessionRouter:", SessionRouter.getRouter().stack)
app.use("/api/sessions", SessionRouter.getRouter())
console.log("SessionRouter vinculado a '/api/sessions'.")
// app.get("/test", (req, res) => {
//     console.log("Ruta de prueba ejecutada");
//     res.send("Ruta de prueba funcionando");
// })



app.listen (PORT, err => {
    if (err)console.log("error: ", err)
    console.log(`listener on port: ${PORT}`)
})
