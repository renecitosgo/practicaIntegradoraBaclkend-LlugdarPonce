
const express = require("express")
const router = express.Router()


router.post("/login", (req, res)=>{

    const { email, password } = req.body

    if (email != "renedir@gmail.com" || password != "reneSantiagoDelEstero") return res.send("login failed")

    req.session.user = {
        email,
        admin: true
    }

    console.log(req.session.user)

    res.send("Login success 🤗")
})


router.get("/logout", (req, res)=>{
    req.session.destroy( err =>{
        if (err) return res.send({status: "error", error:err})
        else return res.send("logout😎")
    })
})




module.exports = router
