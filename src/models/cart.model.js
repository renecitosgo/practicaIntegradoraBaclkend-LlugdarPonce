const { Schema, model } = require ("mongoose")

const cartSchema = new Schema ({
    products: [{
        type: Schema.Types.ObjectId,
        ref: "products"
    }]
})

const cartModel = model ("carts", cartSchema)

module.exports = {
    cartModel
}