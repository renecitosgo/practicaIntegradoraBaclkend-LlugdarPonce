const { cartModel } = require("../models/cart.model")
const { productsModel } = require("../models/products.model")
const mongoose = require("mongoose")

class CartManager {
    async createCart() {
        const newCart = new cartModel()
        await newCart.save()
        return newCart
    }

    async getCartById(cartId) {
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            throw new Error("Invalid cart ID")
        }
        return await cartModel.findById(cartId)

        }

    async addProductToCart(cartId, productId, quantity = 1) {
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            throw new Error("Invalid cart ID")
        }
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw new Error("Invalid product ID")
        }

        const cart = await cartModel.findById(cartId)
        if (!cart) {
            throw new Error("Cart not found")
        }

        const product = await productsModel.findById(productId)
        if (!product) {
            throw new Error("Product not found")
        }

        const existingProductIndex = cart.products.findIndex(p => p.product.toString() === productId)

        if (existingProductIndex !== -1) {

            cart.products[existingProductIndex].quantity += quantity
            
        } else {
            
            cart.products.push({ product: productId, quantity })

        }

        await cart.save()

        return cart
    }

    async deleteCartById(cartId) {

        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            throw new Error("Invalid cart ID")
        }
        await cartModel.findByIdAndDelete(cartId)
    }
}

module.exports = new CartManager()
