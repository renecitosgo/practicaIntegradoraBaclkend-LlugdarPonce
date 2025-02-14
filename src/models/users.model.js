const { Schema, model } = require("mongoose")
const mongoosePaginate = require ("mongoose-paginate-v2")

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    role: {
        type: String,
        default: "user"
    }
})
// Plugin para paginación
userSchema.plugin(mongoosePaginate)

const usersModel = model("users", userSchema)

module.exports = {
    usersModel
}