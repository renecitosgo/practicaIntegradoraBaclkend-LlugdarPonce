const express = require("express")
const auth = require("../../middlewares/auth.middleware")
const router = express.Router()


// este endPoint solo lo puede ver el administrador
router.get("/current", auth ,(req, res)=>{
    res.send("Datos sensibles que solo puede ver el admin!😎")
})

// class Prueba {
//     constructor(nombre, apellido, edad, genero){
//         this.nombre = nombre,
//         this.apellido = apellido,
//         this.edad = edad,
//         this.genero = genero
//     }

//     presentar(){
//         console.log(`Hola, me llamo ${this.nombre} ${this.apellido} y tengo ${this.edad}. Soy ${this.genero}`)
//     }
// }

// const persona1 = new Prueba("Juan", "Garay", 22, "Hombre")
// const persona2 = new Prueba("María", "Mema", 33, "Mujer")

// persona1.presentar()
// persona2.presentar()


// codigo para testear el metodo getUserBy del manager|||||||||||||||||||comienzo
// async function testGetUserBy() {
//     const userService = require("../../dao/usersMongo.manager");
//     const email = "porotoSuizo@example.com"; // Cambia esto según tus datos de prueba

//     try {
//         const user = await userService.getUserBy({ email });

//         if (!user) {
//             console.log("Usuario no encontrado, creando uno nuevo...");
//             const nuevoUsuario = {
//                 email,
//                 name: "porotoSuizo Usuario",
//                 password: "passwordSeguro123",
//             };
//             const userCreado = await userService.createUser(nuevoUsuario);
//             console.log("Usuario creado:", userCreado);
//         } else {
//             console.log("Usuario encontrado:", user);
//         }
//     } catch (error) {
//         console.error("Error al obtener o crear el usuario:", error.message);
//     }
// }



// codigo para testear el metodo getUserBy del manager|||||||||||||||||||fin

// async function testRegisterNewUser() {
//     const userService = require("../../dao/usersMongo.manager");
//     const newUser = {
//         first_name: "Nuevoeeee",
//         last_name: "Usuarisaxsadado",
//         email: "psqss@eample.com", // Cambia el email para cada prueba
//         password: "nuevaContrasena"
//     };

//     try {
//         // Intentamos buscar al usuario en la base de datos
//         const userExist = await userService.getUserBy({ email: newUser.email });

//         if (userExist) {
//             console.log("El usuario ya existe en la base de datos:", userExist);
//             return;
//         }

//         // Si no existe, lo creamos
//         const createdUser = await userService.createUser(newUser);
//         console.log("Nuevo usuario creado:", createdUser);

//     } catch (error) {
//         // Manejamos errores, como intentos de duplicados o problemas de conexión
//         console.error("Error en el registro de usuario:", error.message);
//     }
// }

// testRegisterNewUser();










// codigo para testear el metodo getUserBy del manager|||||||||||||||||||comienzo
// testGetUserBy();
// async function testCreateUser() {
//     const userService = require("../../dao/usersMongo.manager");
//     const userData = {
//         first_name: "Test",
//         last_name: "User",
//         email: "testuser2@example.com",
//         password: "password123"
//     }

//     try {
//         const newUser = await userService.createUser(userData);
//         console.log("Usuario creado:", newUser);
//     } catch (error) {
//         console.error("Error al crear el usuario:", error.message);
//     }
// }

// testCreateUser();


// codigo para testear el metodo getUserBy del manager|||||||||||||||||||fin




// rutas session-----------------------------------------------------------------------comienzo

router.get("/session", (req, res)=>{

    if(req.session.counter){
        req.session.counter++
        res.send(`Se ha visitado el sitio ${req.session.counter} veces.`) /**   Se ha visitado el sitio 3 veces etc... */
    }else{
        req.session.counter = 1
        res.send("Bienvenido!")
    }
})
    




// rutas session---------------------------------------------------------------------------------fin













// rutas cookie-------------------------------------------------------------------------comienzo

router.get("/setCookie", (req, res)=>{
// res vamos a mandar una orden al navegador
    res.cookie("CoderCookie", "Esta es una cookie!", { maxAge: 10000000 }).send("cookie")
})

router.get("/setCookieSigned", (req, res)=>{
    res.cookie("CoderCoockie", "Esta es una Cookie Firmada", { maxAge: 1000000, signed: true }).send("cookie signed")
})

router.get("/getCookie", (req, res)=>{
    res.send(req.cookies)
    //http://localhost:8080/pruebas/getCookie {"CoderCookie":"Esta es una cookie!"}
})

router.get("/getCookieS", (req, res)=>{
    res.send(req.signedCookies)
    // {"CoderCoockie":"Esta es una Cookie Firmada"}
})

router.get("/deleteCookie", (req, res)=>{
    res.clearCookie("CoderCookie").send("Cookie Borrada")
    // http://localhost:8080/pruebas/deleteCookie     Cookie Borrada
})


// rutas cookie---------------------------------------------------------------------------fin

//rutas de captura de parametros y direccionamiento de rutas inexistentes.----inicio
router.param("word", async (req, res, next, word) =>{
    req.word = word 
    next()
})

router.get("/params/:word([0-9]+)", (req,res)=>{
    const { word } = req.params
    console.log(req.word)
    res.send(word)
})

router.get("*", (req,res)=>{
    res.send("Not Found")
})

//rutas de captura de parametros y direccionamiento de rutas inexistentes.----final




module.exports = router