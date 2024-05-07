const { connect } = require("mongoose")

exports.connectDB = () => {
    connect("mongodb+srv://renedir:JerePrograma@cluster0.t7db4l3.mongodb.net/eCommerce?retryWrites=true&w=majority&appName=Cluster0")
    console.log("DB Conected")
}

