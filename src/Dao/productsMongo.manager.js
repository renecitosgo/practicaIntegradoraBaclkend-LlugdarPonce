const { productsModel } = require("../models/products.model")
const mongoose = require("mongoose")


class ProductsManager {

    constructor() {
        console.log('ProductsManager instance created');
    }

    async getAllProducts() {
        return await productsModel.find({})
    }

    async createProduct(productData) {
    return await productsModel.create(productData)
    }

    async getProductById(productId) {
        if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new Error("Invalid product ID")
        }
        return await productsModel.findOne({ _id: productId })
    }

    async updateProduct(productId, productUpdate) {
        if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new Error("Invalid product ID")
        }
        return await productsModel.findByIdAndUpdate(productId, productUpdate, { new: true })
    }

    async deleteProduct(productId) {
        if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new Error("Invalid product ID")
        }
        await productsModel.findByIdAndDelete(productId)
    }
}

module.exports = new ProductsManager()