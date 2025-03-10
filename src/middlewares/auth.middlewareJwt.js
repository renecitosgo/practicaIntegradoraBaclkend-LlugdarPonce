const { verifyToken } = require("../utils/jsonwebtoken")

function authJwt (req, res, next) {

    const token = req.cookies.cookieCreadaEnLogin || req.headers.authorization  
    console.log("Cookies en la solicitud:", req.cookies);

    if(!token){
        return res.status(401).send("Error de Autorización, token no proporcionado")
    }

    try {
        const decoded = verifyToken(token)
        req.user = decoded.user

        if(req.user.role !== "admin"){
        return res.status(403).send("Error, no tiene permiso para administrar")
        }
        next()

    } catch (error) {
        console.error("error verificando el tokenn", error.message)
        return res.status(401).send("Error de autorización: Token inválido o expirado")
    }
    
}

module.exports = authJwt