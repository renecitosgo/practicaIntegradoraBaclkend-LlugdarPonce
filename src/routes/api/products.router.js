const express = require('express')
const router = express.Router()
const productsManager = require('../../dao/productsMongo.manager')




router.get("/", async (req, res) => {

    try {
        const productList = await productsManager.getAllProducts()
        res.send({ status: "success", payload: productList })
    } catch (error) {
        console.error(error)
        res.status(500).send({ status: "error", message: error.message })
    }
})


router.post("/", async (req, res) => {
    
    try {
        const result = await productsManager.createProduct(req.body)
        res.send({ status: "success", payload: result })
    } catch (error) {
        res.status(400).send({ status: "error", message: error.message })
    }
})


router.get("/:pid", async (req, res) => {

    try {
        const productFound = await productsManager.getProductById(req.params.pid)
        res.send({ status: "success", payload: productFound })
    } catch (error) {
        res.status(400).send({ status: "error", message: error.message })
    }
})


router.put("/:pid", async (req, res) => {

    try {
        const result = await productsManager.updateProduct(req.params.pid, req.body)
        res.send({ status: "success", payload: result })
    } catch (error) {
        res.status(400).send({ status: "error", message: error.message })
    }
})


router.delete("/:pid", async (req, res) => {

    try {
        await productsManager.deleteProduct(req.params.pid)
        res.send({ status: "success", message: "Producto eliminado 💔" })
    } catch (error) {
        res.status(400).send({ status: "error", message: error.message })
    }
})

module.exports = router