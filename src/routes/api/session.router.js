const express = require('express')
const sessionsRouter = express.Router()
const UserDaoMongo = require('../../Dao/usersDao.Mongo')
const userService = require("../../services/index.js")
const userController = require("../../controllers/users.controllers.js")
// const userService = require('../../dao/usersMongo.manager')
const auth = require('../../middlewares/auth.middleware')
const { createHash, isValidPassword } = require("../../utils/bcrypt")
const passport = require ("passport")
const { generateToken } = require('../../utils/jsonwebtoken')
const filterSensitiveData = require("../../utils/filterSensitiveData")
const { authTokenMiddleware } = require("../../utils/jsonwebtoken")
const passportCall = require("../../utils/passportCall")
const authorization = require('../../utils/authorizationJwt')

// antes de passport// ------------------------------------------comienzo

// ------------------comeinzo de antes de controller-----------------------------
// sessionsRouter.post("/register", userController.createUser, async (req, res) => {

//     const { first_name, last_name, email, password } = req.body

//     if (!first_name || !last_name || !email || !password) {
//         return res.status(400).send({ error: "Faltan datos obligatorios" })
//     }

//     console.log("Datos recibidos para registro:", req.body)

//     try {
//         // Verificación inicial del usuario
//         const userExist = await userService.getItem({ email })

//         if (userExist) {
//             console.log("Usuario ya existe:", userExist)
//             return res.status(401).send({ status: "error", error: "El usuario ya existe" })
//         }

//         // Creación del nuevo usuario
//         const newUser = await userController.createItem({ 
//             first_name,
//             last_name,
//             email,
//             password: createHash(password) //hay que encriptar 
//         })
//         console.log("Nuevo usuario creado:", newUser) 
//         // este log no esta protegiendo datos de usuario... es recomendable pasar newUser por la funcion filterSensitiveData() y usar siempre lo que retorna esta funcion... es decir... un usuario filtrado sin contraseña: filteredUser

//         const filteredUser = filterSensitiveData(newUser, [ "password" ])
//         console.log("Datos protegidos del usuario:", filteredUser)


        
//         //datos dentro del token
//         const token = generateToken({
//             id: filteredUser._id,
//             email
//         })

//         res.cookie("coderCookieToken", token, {
//             maxAge: 60*60*1000*24,
//             httpOnly: true
//         }).send({status: "success"})

//     } catch (error) {

//         console.error("Error en el proceso de registro:", error.message)
//         res.status(500).send({ status: "Error", message: error.message })

//     }
// })

// ------------------fin de antes de controller-----------------------------

sessionsRouter.post("/register", userController.createUser) 



sessionsRouter.post("/login", async (req, res)=>{

    const { email, password } = req.body

    console.log("Body recibido en la solicitud:", req.body);


    if (!email || !password) {
        return res.status(400).send({ error: "Faltan datos obligatorios" })
    }

    const userFound = await userService.getItem({ email })
    if(!userFound) return res.status(404).send({status: "error", error: "Usuario no encotrado"})

    const isValid = isValidPassword(password, userFound.password)
        console.log("Resultado de la comparación: ", isValid)
        console.log("Contraseña ingresada:", password);
        console.log("Contraseña almacenada:", userFound.password);
        console.log("Contraseña ingresada:", password, typeof password);
        console.log("Contraseña almacenada:", userFound.password, typeof userFound.password);
    
    if (!isValid) return res.status(401).send({status: "error", error: "Password incorrecto"})


    const { first_name, last_name, role } = userFound

    // req.session.user = {
    //     email,
    //     first_name,
    //     last_name,
    //     admin: userFound.role === "admin" // harcodeado//
    // }

    

    const token = generateToken({   
        id: userFound._id,
        email,
        first_name: userFound.first_name,
        last_name: userFound.last_name,
        role: userFound.role
    })
    console.log("Token generado:", token);
    // console.log(req.session.user)

    res.cookie("cookieCreadaEnLogin", token, {
        maxAge: 60*60*1000*24,
        httpOnly: true
    }).send({status: "success",
            user: {
                first_name,
                last_name,
                email,
                role,
            }
    })
    

    // res.send({   
    //     message: `Bienvenido ${first_name} ${last_name} 😎`,
    //     status: "success",
    //     token: token
    // })
    

})
// antes de passport //--------------------------------------------fin

// sessionsRouter.get("/github", passport.authenticate("github",{ scope: [ "user:email" ] }))


// sessionsRouter.get("/githubcallback", 
//     passport.authenticate("github",{failureRedirect:"/login"}), (req, res)=>{

//         console.log("Usuario autenticado:", req.user) //DEPURACIÓN
        
//         req.session.user = {
//             first_name: req.user.first_name,
//             last_name: req.user.last_name,
//             email: req.user.email
//         }

//         res.redirect("/products")
//     }
// ) 



//fue comentado para implentar JWT
// sessionsRouter.post("/register",  passport.authenticate("register", {failureRedirect: "/failregister"}), async (req, res)=>{
//     res.send({status: "success", message: "User registrado"})
// })

// sessionsRouter.post("/failregister", async (req, res)=>{
//     console.log("Falló la estrategia")
//     res.send({error: "failed"})
// })



// sessionsRouter.post("/login",passport.authenticate("login", {failureRedirect: "/faillogin"}), async(req, res)=>{
//     if(!req.user) return res.status(400).send({status: "error", error: "Credenciales inválidas"})

//     req.session.user = {
//         first_name: req.user.first_name,
//         last_name: req.user.last_name,
//         email: req.user.email
//     }
//     res.send({status: succes, payload: req.user}) // esto no deberia estare aqui
// })

// sessionsRouter.post("/faillogin", (req, res)=>{
//     res.send({error: " Falló en el login"})
// })

// sessionsRouter.get("/current", auth, (req, res) => {
//     res.send("Datos sensibles que solo puede ver el admin!😎")
// })
//fue comentado para implentar JWT

// //ruta current con middleware
// sessionsRouter.get("/current", authTokenMiddleware, (req, res) => {
//         res.send("Datos sensibles que solo puede ver el admin que tiene el token!!😎")
//     })

// ruta current con passport passport.authenticate
// sessionsRouter.get("/current", passport.authenticate("jwt", {session: false}), (req, res) => {

// ruta current con passpor pero con el Custom y middleware de passportCall|
sessionsRouter.get("/current", passportCall("jwt"), authorization("admin"), (req, res) => {
        console.log("Usuario autenticado:", req.user)
            res.send("Datos sensibles que solo puede ver el admin que tiene el token!!😎")
        })




sessionsRouter.get("/logout", (req, res)=>{

    req.session.destroy( err =>{

        if (err) {
            return res.status(500).send({status: "error", message: "Failed to Logout"})
        }
        
        res.render("login")
    })
})






    module.exports = sessionsRouter
