const { productsModel } = require("../models/products.model")
const mongoose = require("mongoose")



class ProductsDao {

    constructor() {

        this.accesoAlproductsModel = productsModel

        console.log('ProductsDao instance created')
    }



    async getAll(page, limit) {

        return await this.accesoAlproductsModel.find({})

    }



    async create(newItem) {

        const createdProduct = await this.accesoAlproductsModel.create(newItem)

        return createdProduct

    }


    async getBy(filter) {

        const product = await this.accesoAlproductsModel.findOne(filter)

        return product
    }



    async update(id, itemUpdate) {

        const updatedProduct = await this.accesoAlproductsModel.findByIdAndUpdate(id, itemUpdate, { new: true })
        
        return updatedProduct
    }



    async delete(id) {
        
        const deletedProduct = await this.accesoAlproductsModel.findByIdAndDelete(productId)

        return deletedProduct
        
    }
}

module.exports = new ProductsDao ()