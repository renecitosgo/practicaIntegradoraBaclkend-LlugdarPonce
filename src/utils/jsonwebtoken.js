const jwt = require("jsonwebtoken")


// firma de seguridad para que no se corrompa el token
const PRIVATE_KEY = "CoderKeyS@cretToken"


// generación del token
const generateToken = user => jwt.sign({user}, PRIVATE_KEY, {expiresIn: "24h"})
//Bearer uyvrgnwelivunweoivunewlvuewrlvuewrviubweorivbweoriuvbweornvn (este es un token)


// Verificación de Token separada del Midleware de AuthJwt
const verifyToken = (token)=>{
    try {
        const decoded = jwt.verify(token, "CoderKeyS@cretToken")
        return decoded 
    } catch (error) {
        throw new Error ("Token inválido o expirado")
        
    }
}


module.exports = {
    generateToken,
    verifyToken,
    PRIVATE_KEY //generalmante no se exportan asi las claves... se usa variables de entorno
}





// otro metodo para validad por Headers


// validar que venga por cabecera

// const authTokenMiddleware = (req, res, next) => {
//     const authHeader = req.headers.authorization
//     console.log('Authorization Header:', authHeader)


//     if(!authHeader) return res.status(401).send({status: "error", error: "Not Authenticated"})

//     const token = authHeader.split(" ")[1]
//     console.log('Token:', token)
// 
// Probaremos hacer las validaciones por cookie por ello comentaremos la validacion por cabecera
// este archivo debería estar en la carpeta de middleware tal vez





// Exportar funciones




