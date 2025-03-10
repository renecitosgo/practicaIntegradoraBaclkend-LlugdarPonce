const ClassRepository = require("./class.repository")
const mongoose = require("mongoose")

class ProductRepository extends ClassRepository {

    constructor(dao){

        console.log("ProductRepository iniciandose")

        super(dao)
    }

    async getProduct(filter){   

        try {
            if (typeof filter !== "object" || filter === null) {
                throw new Error("El filtro debe ser un objeto");
            }

            if(!filter || Object.keys(filter).length === 0){
                throw new Error ("Debe proporcionar al menos un criterio de búsqueda")
            }
            if(filter._id && !mongoose.isValidObjectId(filter._id))
                throw new Error("El formato del Id de producto no es válido")

            const productFound = await super.getItem(filter)

            if(!productFound){
                throw new Error ("El producto no fue encontrado")
            }

            return productFound


        } catch (error) {
            console.error (`Error en getProducts ${error.message}`)

            throw error
        }
    }


    async getProducts (){

        try {
            const allProducts = await super.getItems()

            if(!allProducts.docs.length){
                throw new Error ("No se pueden traer los productos o no existen")
            }
            return allProducts
        } catch (error) {
            console.error(`error en el getProducts ${error.message}`)
        }
    }


    async createProduct (newProduct){

        if (typeof newProduct !== "object" || newProduct === null) {
            throw new Error("El producto debe ser un objeto");
        }

        try {
            if(!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnails || !newProduct.code || !newProduct.stock){
                throw new Error ("Faltan datos obligatorios para crear su producto")}

            const productExist = await super.getItem({code: newProduct.code})

            if(productExist){
                throw new Error ("Este producto ya existe en la base de datos")
            }

            const createdProduct = await super.createItem(newProduct)

            if(!createdProduct){
                throw new Error ("El producto no se pudo crear")
            }

            return createdProduct

        } catch (error) {
            console.error(`error en createProducts ${error.message}`)
        }

    }

    async updateProduct (id, productUpdate){
        try {
            if(!id){
                throw new Error("se necesita el id del producto a actualizar")
            }

            if(!mongoose.isValidObjectId(id)){  
                throw new Error ("el id proporcionado no es válido")
            }

            const updatedProduct = await super.updateItem(id, productUpdate)

            if(!updatedProduct){
                throw new Error ("No se pudo actualizar el producto")
            }

            return updatedProduct

        } catch (error) {
            console.error(`error el update product ${error.message}`)
            throw error
        }

    }

    async deleteProduct(id){

        try{
            if(!id){
                throw new Error("El id no existe")
            }
            if(!mongoose.isValidObjectId(id)){
                throw new Error("EL id proporcionado no es válido")
            }

            const deletedProduct = await super.deleteItem(id)

            if(!deletedProduct){
                throw new Error("El producto no pudo ser eliminado")
            }

            return deletedProduct

        }catch(error){
            console.error(`error al en deleteproduct ${error.message}`)
            throw error
        }
    }
}




module.exports = ProductRepository