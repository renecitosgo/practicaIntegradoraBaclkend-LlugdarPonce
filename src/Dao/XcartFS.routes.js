// import { Router } from "express"
// import CartManager from "./CartManager.js"


// const router = Router()
// const cartManager = new CartManager ("./data/carts.json")



// router.post("/", async (req, res) => {
//     try {
//         cartManager.addCart()
//         await cartManager.saveCart()

//         res.status(200).send({status: "success", message: "Carrito creado"})

//     } catch (error) {

//         res.status(500).send({status: "error", message: "Error al guardar el carrito"})
//     }
// })




// router.get("/:cid", (req, res) => {

//     try {

//         const cartId = Number(req.params.cid)

//         if(isNaN(cartId)){
//             return res.status(400).send({status: "error", message: "El Id del carrito es inválido!"})
//         }

//         const products = cartManager.getProductsInCart(cartId)
//         res.status(200).send({ status: "success", payload: products })
        
//     } catch (error) {
//         res.status(404).send({ status: "error", message: "No se encontró el carrito" })
//     }
// })

// router.post("/:cid/product/:pid", (req, res) => {
//     try {
//         const cartId = Number(req.params.cid)
//         const productId = Number(req.params.pid)
//         cartManager.addProductToCart(cartId, productId)
//         res.status(200).send({ status: "success", message: "Producto agregado al carrito" })
//     } catch (error) {
//         res.status(404).send({ status: "error", message: error.message })
//     }
// })

// router.delete('/:id', (req, res) => {
//     try {
//         const id = Number(req.params.id);
//         cartManager.deleteCartById(id)
//         res.send({ message: "Carrito eliminado satisfactoriamente!🙂" })
//     } catch (error) {
//         res.status(500).send({ error: error.message })
//     }
// })


// export default router