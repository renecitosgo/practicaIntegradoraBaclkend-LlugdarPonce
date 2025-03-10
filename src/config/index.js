const dotenv = require("dotenv")
const MongoSingleton = require("./mongoSingleton")
const commander = require("../utils/commander")
const program = require("../utils/commander")


const { mode } = commander.opts()

const environment = mode

// Cargar las variables de entorno según el modo
dotenv.config({
    
    path: environment === "production" ? "./.env.production" : "./.env.development"

})

console.log("URL de MongoDB desde process.env:", process.env.MONGO_URL);

exports.objectConfig = {
    port:            process.env.PORT || 8080,  
    mongo_url:       process.env.MONGO_URL,
    jwt_private_key: process.env.JWT_PRIVATE_KEY,
    // persistence:     process.env.PERSISTENCE,   
    gmail_pass:      process.env.GMAIL_PASS,
    gmail_user:      process.env.GMAIL_USER  
} 


// Exportar la conexión a la base de datos
exports.connectDB = () => MongoSingleton.getInstance(process.env.MONGO_URL)


// Definir y exportar PORT correctamente


// // Imprimir variables de entorno para depuración
//     console.log("GMAIL_USER:", process.env.GMAIL_USER)
//     console.log("GMAIL_PASS:", process.env.GMAIL_PASS)


// EXPORTACIONES------------------------------------------------------------------------------

// Exportar variables de configuración




// // // Exportar la conexión a la base de datos
// exports.connectDB = () => MongoSingleton.getInstance(process.env.MONGO_URL)




















// ante de clase 24 tenia esta conección a mongo... luego vino dotenv...
// exports.connectDB = () => {
//     connect("mongodb+srv://renedir:JerePrograma@cluster0.t7db4l3.mongodb.net/eCommerce?retryWrites=true&w=majority&appName=Cluster0")
//     console.log("DB Conected")
// }

// console.log("te amo papá y  sos el mejor y me alegra que este trabajando como vos")
// insertBatteries(batteries) EJECUCION DE INSERTAR BATERÍAS en Mongo