
function auth (req, res, next) {
    if(req.session?.user?.admin){
        console.log("Middleware auth ejecutado")
        return next()
    }

    return res.status(401).send("error de autorización")
    
}

module.exports = auth