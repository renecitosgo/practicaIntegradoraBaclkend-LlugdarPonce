
const authorization = role => {
    return async (req, res, next) =>{
        console.log(req.user)

        if(!req.user){
            return res.status(401).send({error: "Unathorized"})

        }

        if(req.user.role !== role) { 
            return res.status(401).send({error: "Not permissions"})
        }
        
        next()

    }
}

module.exports = authorization
