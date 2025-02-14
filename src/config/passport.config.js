const passport = require ("passport")
// 1 const localStrategy = require ("passport-local").Strategy
const userService = require('../dao/usersMongo.manager')
const { createHash, isValidPassword } = require ("../utils/bcrypt")
//2 const GithubStrategy = require("passport-github2")
const jwt = require("passport-jwt")
const { PRIVATE_KEY } = require("../utils/jsonwebtoken") 

const JWTStrategy = jwt.Strategy //3
const ExtractJWT = jwt.ExtractJwt




// // primera configuracion de passport adentro del initializePassport--------------------- -------------------------------------------comienzo

//         passport.use ("register", new localStrategy({
//             passReqToCallback: true,
//             usernameField: "email"
//         }, async ( req, username, isValidPassword, done ) => {
//             const { first_name, last_name } = req.body

//             try {
//                 let userFound = userService.getUserBy({email: username})
//                 if(userFound){
//                     console.log("El usuario ya existe")
//                     return done (null, false)
//                 }

//                 let newUser = {
//                     first_name,
//                     last_name,
//                     email: username,
//                     password: createHash(password)
//                 }

//                 let result = await userService.createUser(newUser)

//                 return done(null, result)

//             } catch (error) {
//             return done("Error al registrar el usuario" +error)
//             }
//         }
//     ))



//     passport.use("login", new localStrategy({
//         usernameField: "email"
//     }, async ( username, password, done ) => {

//         try {
//             const user = await userService.getUserBy({email: username})
//             if(!user){
//                 console.log("Usuario no encontrado")
//                 return done(null, false)
//             }
//             if(!isValidPassword(password, { password: user.password })){
//                 return done (null, false)
//             }
//             return done(null, user)
//         } catch (error) {
//             return done(error)
//         }
//     }))
// // primera configuracion de passport -----------------------------------------fin




//2da configuracion de passport sin JWT-----------------------inicio

// const initializePassport = () => {

//     passport.use("github", new GithubStrategy({

//         clientID:"Iv23limRHfJ1Uz6ziZzM" ,
//         clientSecret:"f3da449f68f0f31e22922878d8fe5b26088438e5",
//         callbackURL:"http://localhost:8080/api/sessions/githubcallback"

//     }, async(accesToken, refreshToken, profile, done)=>{

//         try {

//             console.log(profile)

//             let email = profile._json.email

//             if(!email){
//                 const res = await fetch ("https://api.github.com/user/emails", {
//                     headers: {
//                         Authorization: `Bearer ${accesToken}`
//                     }
//                 })
//                 const emails = await res.json()
//                 email = emails.find(email=>email.primary && email.verified)?.email
//             }
//             if(!email){
//                 return done(new Error("No se pudo obtener el correo electrónico del usuario"))
//             }

//             let user = await userService.getUserBy({ email })

//             if(!user){
//                 let newUser ={
//                     first_name: profile._json.name,
//                     last_name: profile._json.name,
//                     email: email,
//                     password: ""
//                 }

//                 let result = await userService.createUser(newUser)

//                 done(null, result)

//             }else{
//                 done(null, user)
//             }

//         } catch (error) {
//             return done(error)
//         }
//     }))

//     passport.serializeUser((user, done)=>{
//         done(null, user._id)
//     })

//     passport.deserializeUser(async(id, done)=>{
//         try {
//             let user = await userService.getUserBy({_id: id})
//             done ( null, user)
        
//         } catch (error) {
//             done(error)
//         }
//     })
// }
//2da configuracion de passport sin JWT-----------------------FIN


//passport con JWT-----------------------------------Comienzo

const initializePassport = () => {
    //jwt
    //función cvreada por nosotros por que passport no puede leer cookies   
    const cookieExtractor = req => {
        let token = null
        if(req && req.cookies){
            token = req.cookies["coderCookieToken"]
        }
        console.log("Token extraído:", token)
        return token 
    } 


    //metodo para extraer la cookie del req
    passport.use(
        "jwt", 
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
                secretOrKey: PRIVATE_KEY
            }, 
            
            async (jwt_payload, done) => {
                try {
                    // Extrae la información relevante del payload
                    const user = jwt_payload.user || jwt_payload

                    // Asigna el usuario directamente a req.user
                    return done(null, user)

                } catch (error) {

                    return done(error)

                }
            }
        )
    )
}

//passport con JWT-----------------------------------Fin



module.exports = initializePassport



