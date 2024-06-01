
function auth (req, res, next) {
    if(req.session?.user?.email === "renedir@gmail.com" && req.session?.user?.admin)
        return next()

    return res.status(401).send("error de autorización")
}

module.exports = auth