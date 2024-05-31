const express = require('express')
const router = express.Router()
const cartManager = require('../../dao/cartsMongo.manager.js')

router.post("/", async (req, res) => {
    try {
        const newCart = await cartManager.createCart()
        res.status(200).send({ status: "success", message: "Carrito creado" })
    } catch (error) {
        console.error(error)
        res.status(500).send({ status: "error", message: "Error al guardar el carrito" })
    }
})

router.get("/:cid", async (req, res) => {
    try {
        const cart = await cartManager.getCartById(req.params.cid)
        res.status(200).send({ status: "success", payload: cart.products })
    } catch (error) {
        console.error(error)
        res.status(500).send({ status: "error", message: error.message })
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { quantity } = req.body
        const cart = await cartManager.addProductToCart(req.params.cid, req.params.pid, quantity)
        res.status(200).send({ status: "success", message: "Producto agregado al carrito" })
    } catch (error) {
        console.error(error)
        res.status(500).send({ status: "error", message: error.message })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await cartManager.deleteCartById(req.params.id)
        res.send({ message: "Carrito eliminado satisfactoriamente!🙂" })
    } catch (error) {
        console.error(error)
        res.status(500).send({ error: error.message })
    }
});

module.exports = router
