const { Schema, model } = require ("mongoose")
const mongoosePaginate = require ("mongoose-paginate-v2")

const OrderSchema = new Schema({
    title: String,
    description: String,
    thumbnails: [String],
    code: String,
    stock: Number,
    size: {
        type: String,
        enum: ["livianas", "maquinarias", "servicioPesado"],
        default: "livianas"
    }
})

OrderSchema.plugin(mongoosePaginate)

const OrderModel = model ("orders", OrderSchema)

module.exports = OrderModel