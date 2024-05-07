const { connect } = require("mongoose")

exports.connectDB = () => {
    connect("mongodb://127.0.0.1:27017/c53145")
    console.log("DB Conected")
}


// // mongodb+srv://renedir:<password>@cluster0.t7db4l3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
