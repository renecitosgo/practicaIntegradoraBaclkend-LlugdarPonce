const express = require("express")
const auth = require("../../middlewares/auth.middleware")
const router = express.Router()


// este endPoint solo lo puede ver el administrador
router.get("/current", auth ,(req, res)=>{
    res.send("Datos sensibles que solo puede ver el admin!😎")
})




// rutas session----------------------------------------------------------------------------comienzo

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













// rutas cookie------------------------------------------------------------------------------comienzo

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





module.exports = router