const  mongoose = require("mongoose")
const { Router } = require("express")
const { cartModel } = require("../../models/cart.model.js")
const { productsModel } = require("../../models/products.model.js")

const router = Router()

// -----------------------------------------------------------------------------------------------
// Podría ser innecesario este router.post("/"... por que se supone que el carrito se crea cuando adicionamos un producto... aqui se crea un carrito vacio...
// -----------------------------------------------------------------------------------------------
router.post("/", async (req, res) => {

    try {
        const newCart = new cartModel()
        await newCart.save()

        res.status(200).send({status: "success", message: "Carrito creado"})

    } catch (error) {

        console.error(error)

        res.status(500).send({status: "error", message: "Error al guardar el carrito"})
    }
})



router.get("/:cid", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.cid)) {
            return res.status(400).send({ status: "error", message: "ID de carrito inválido" })
        }

        const cartId = req.params.cid
        const cart = await cartModel.findById(cartId).populate('products')

        if (!cart) {
            return res.status(404).send({ status: "error", message: "No se encontró el carrito" })
        }

        res.status(200).send({ status: "success", payload: cart.products })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ status: "error", message: "Error al buscar el carrito" })
    }
})

// -------------------------------------------------------------------------------------------
// Mi metodo post no tiene la lógica para adición/resta del quantity del mismo product...
// --------------------------------------------------------------------------------------------
router.post("/:cid/product/:pid", async (req, res) => {

    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.cid)) {
            return res.status(400).send({ status: "error", message: "ID de carrito inválido" })
        }

        if (!mongoose.Types.ObjectId.isValid(req.params.pid)) {
            return res.status(400).send({ status: "error", message: "ID de producto inválido" })
        }

        const cartId = req.params.cid
        const productId = req.params.pid


        const product = await productsModel.findById(productId)
        if (!product) {
            return res.status(404).send({ status: "error", message: "No se encontró el producto" })
        }

        const cart = await cartModel.findById(cartId)
        if (!cart) {
            return res.status(404).send({ status: "error", message: "No se encontró el carrito" })
        }

        cart.products.push(product)
        await cart.save()

        res.status(200).send({ status: "success", message: "Producto agregado al carrito" })

    } catch (error) {

        console.error(error)

        return res.status(500).send({ status: "error", message: "Error al agregar el producto al carrito" })

    }
})

// ---------------------------------------------------------------------------------------------------
// ENCUENTRO INNECESARIO ESTA RUTA (router.put) CON ESTA LOGICA AQUI, dado que para actualizar productos tenemos el put en products y para actualizar carritos basta con agregar o eliminar productos en carts...
//----------------------------------------------------------------------------------------------------

// router.put("/:cid/product/:pid", async (req, res) => {

//     try {

//         if (!mongoose.Types.ObjectId.isValid(req.params.cid)) {
//             return res.status(400).send({ status: "error", message: "ID de carrito inválido" })
//         }

//         if (!mongoose.Types.ObjectId.isValid(req.params.pid)) {
//             return res.status(400).send({ status: "error", message: "ID de producto inválido" })
//         }

//         const cartId = req.params.cid
//         const productId = req.params.pid

//         const product = await productsModel.findById(productId)
//         if (!product) {
//             return res.status(404).send({ status: "error", message: "No se encontró el producto" })
//         }

//         const cart = await cartModel.findById (cartId)
//         if (!cart) {
//             return res.status(404).send({ status: "error", message: "No se encontró el carrito" })
//         }

//         const productIndex = cart.products.findIndex (p => p._id.toString() === productId)
//         if (productIndex === -1) {
//             return res.status(404).send({ status: "error", message: "El producto no se encontró en el carrito" })
//         }

//         cart.products[productIndex] = product
//         await cart.save()

//         res.status(200).send({ status: "success", message: "Producto actualizado en el carrito" })

//     } catch (error) {

//         console.error(error)

//         return res.status(500).send({ status: "error", message: "Error al actualizar el producto en el carrito" })
        
//     }
// })



router.delete('/:id', async (req, res) => {

    try {

        const id = req.params.id

        await cartModel.findByIdAndDelete(id)

        res.send({ message: "Carrito eliminado satisfactoriamente!🙂" })

    } catch (error) {

        res.status(500).send({ error: error.message })
    }

})




module.exports = router 