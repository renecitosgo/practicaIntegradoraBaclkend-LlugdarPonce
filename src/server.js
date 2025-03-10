// 🔹 Importación de módulos externos
const express = require("express"); // Tenías un error de tipeo en "expresfs"
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const cors = require("cors")
// 🔹 Importación de módulos internos
const routerApp = require("./routes/index.js");
const initializePassport = require("./config/passport.config.js");
const MongoSingleton = require("./config/mongoSingleton.js");
const { connectDB, objectConfig } = require("./config/index.js");

const { port, mongo_url } = objectConfig;

// 🔹 Inicialización de Express
const app = express();

// 🔹 Configuración de variables de entorno
console.log("Valor de process.env.PORT:", process.env.PORT);

// 🔹 Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser("s3cr3t@Firma"))
app.use(cors())

// Middleware para registrar solicitudes en consola
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    console.log("Body:", req.body);
    next();
});

// 🔹 Inicialización de Passport
initializePassport();
app.use(passport.initialize());

// 🔹 Configuración del motor de plantillas Handlebars
app.engine("hbs", handlebars.engine({ extname: ".hbs" }));
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

// 🔹 Conexión a la base de datos
    connectDB();
    MongoSingleton.getInstance(mongo_url);

// 🔹 Rutas de la aplicación
app.use(routerApp);

// 🔹 Inicio del servidor
app.listen(port, (err) => {
    if (err) console.log("Error:", err);
    console.log(`Servidor escuchando en el puerto: ${port}`);
});
