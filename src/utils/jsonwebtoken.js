const jwt = require("jsonwebtoken")


// firma de seguridad para que no se corrompa el token
const PRIVATE_KEY = "CoderKeyS@cretToken"


// generación del token
const generateToken = user => jwt.sign({user}, PRIVATE_KEY, {expiresIn: "24h"})
//Bearer uyvrgnwelivunweoivunewlvuewrlvuewrviubweorivbweoriuvbweornvn (este es un token)



// validar que venga por cabecera

const authTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    console.log('Authorization Header:', authHeader)


    if(!authHeader) return res.status(401).send({status: "error", error: "Not Authenticated"})

    const token = authHeader.split(" ")[1]
    console.log('Token:', token)

jwt.verify(token, PRIVATE_KEY, (error, credential)=>{
    if(error) {
        console.error('Error verifying token:', error)
        return res.status(401).send({status: "error", error: "Not authorized"})
    }
    

    console.log('Credential:', credential);
    req.user = credential.user

    next()
})
}

// este archivo debería estar en la carpeta de middleware tal vez





// Exportar funciones
module.exports = {
    generateToken,
    authTokenMiddleware,
    PRIVATE_KEY //generalmante no se exportan asi las claves... se usa variables de entorno
};
