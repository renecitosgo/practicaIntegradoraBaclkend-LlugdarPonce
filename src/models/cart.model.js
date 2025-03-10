const { Schema, model } = require ("mongoose")

const CartSchema = new Schema ({
    products: {
        type: [ {
            product: {  
                type: Schema.Types.ObjectId,
                ref: "products",
                required: true
            },

            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        } ]
    }
})

CartSchema.pre("find", function(){
    this.populate("products.product")
})

CartSchema.pre("findOne", function(){
    this.populate("products.product")
})


const cartModel = model ("carts", CartSchema)

module.exports = {
    cartModel
}
