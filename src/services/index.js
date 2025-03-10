const usersDaoMongo = require("../Dao/usersDao.Mongo");
const UserRepository = require("../repositories/user.repository");

const productsDaoMongo = require("../Dao/productsDaoMongo")
const ProductRepository = require("../repositories/products.repository")


// esto es una instancia de UserRepository y permite que el controlador la use y accededa a los metodos de la base de datos 
const userService = new UserRepository(usersDaoMongo)



// esto es una instancia de ProductRepository y permite que el controlador la use y accededa a los metodos de la base de datos

const productService = new ProductRepository(productsDaoMongo)





module.exports = {
    userService,
    productService
}