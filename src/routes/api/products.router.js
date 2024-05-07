const { Router } = require ("express")
const { productsModel } = require("../../models/products.model")

const router = Router()

router.get("/", async(req, res)=> {
    const productList = await productsModel.find({})
    res.send({status:"success", payload: productList })
})

router.post("/", async (req, res)=>{
    try{
        const { body } = req
        const result = await productsModel.create(body)
        res.send({status: "success", payload: result})
    }catch(error){
        res.status(400).send({error: "error", message: error.message})
    }
})

router.get("/:pid", async (req, res)=>{
    const { pid } = req.params
    const productFound = await productsModel.findOne({_id: pid})
    res.send({status: "success", payload: productFound})
})


router.put("/:pid", async (req, res)=>{
    const { pid } = req.params
    const productUpdate = req.body

    try{
        const result = await productsModel.findByIdAndUpdate(pid, productUpdate, {new: true})
        res.send({status: "success", payload: result})
    }catch(error){
        res.status(400).send({ error: "error", message: error.message })
    }
})

router.delete("/:pid", async (req, res)=>{
    const { pid } = req.params

    try{
        await productsModel.findByIdAndDelete(pid)
        res.send({ status: "success", message: "Producto eliminado 💔" })
    }catch(error){ res.status(400).send({status: "error", error: error.message })}
})

module.exports = router
