const { cartModel } = require("../models/cart.model");
const { productsModel } = require("../models/products.model");
const mongoose = require("mongoose")

class CartManager {
    async createCart() {
        const newCart = new cartModel();
        await newCart.save();
        return newCart;
    }

    async getCartById(cartId) {
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            throw new Error("Invalid cart ID");
        }
        const cart = await cartModel.findById(cartId);
        console.log(cart); // Debería mostrar el carrito con productos poblados
        return cart;
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            throw new Error("Invalid cart ID");
        }
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw new Error("Invalid product ID");
        }

        const cart = await cartModel.findById(cartId);
        if (!cart) {
            throw new Error("Cart not found");
        }

        const product = await productsModel.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }

        console.log("Cart ID:", cartId);
        console.log("Product ID:", productId);
        console.log("Cart Products:", cart.products);

        const existingProductIndex = cart.products.findIndex(p => p.product.equals(productId));
        if (existingProductIndex !== -1) {
            console.log("Product found at index:", existingProductIndex);
            cart.products[existingProductIndex].quantity += quantity;
            console.log("Updated quantity:", cart.products[existingProductIndex].quantity);
        } else {
            console.log("Product not found, adding new product.");
            cart.products.push({ product: productId, quantity });
            console.log("Product added:", { product: productId, quantity });
        }

        try {
            console.log("Attempting to save cart...");
            await cart.save();
            console.log("Cart saved successfully:", cart);
        } catch (error) {
            console.error("Error saving cart:", error);
        }

        // Aquí ya no poblamos manualmente
        return cart;
    }

    async deleteCartById(cartId) {
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            throw new Error("Invalid cart ID");
        }
        await cartModel.findByIdAndDelete(cartId);
    }
}

module.exports = new CartManager();
