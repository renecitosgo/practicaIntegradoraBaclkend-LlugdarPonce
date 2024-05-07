const { Schema, model } = require("mongoose")

const productSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    thumbnails: [String],
    code: {
        type: String,
        unique: true,
        required: true
    },
    stock: Number
})

const productsModel = model ("products", productSchema)

module.exports = {
    productsModel
}