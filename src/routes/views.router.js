const { Router } = require("express")
const { uploader } = require("../utils/multer.js")

const router = Router()

router.get("/", (req,res)=>{
    res.render ("index")
})

router.get("/login", (req,res)=>{
    res.render ("index")
})

router.get("/register", (req,res)=>{
    res.render ("index")
})

router.get("/products", (req,res)=>{
    res.render ("index")
})

router.get("/profile", (req,res)=>{
    res.render ("index")
})

router.post("/upload-file", uploader.single("myFile"), (req,res)=>{
    res.render ("succsessFile")
})

module.exports = router
