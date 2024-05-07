const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        required: true
    }
})

const usersModel = model("users", userSchema)

module.exports = {
    usersModel
}