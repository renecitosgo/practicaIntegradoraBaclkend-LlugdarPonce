const { productService } = require("../services/index")
const mongoose = require ("mongoose")
const { ObjectId } = require("mongodb")


class ProductsController {

    constructor() {

        this.productsService = productService

        console.log("Products controller inicialized")

    }

    
    getProduct = async (req, res)=>{

        const { id } = req.params

        try {

            const productsFound = await this.productsService.createProduct({_id: new ObjectId(id)})

            res.send({ status: "success", payload: productsFound })
                        
        } catch (error) {
            res.status(500).send({status: "error", message: "error en el getProductBy", error: error.message})
            
        }

    }

    getProducts = async (req, res) => {

        try {

            const result = await this.productsService.getItems()

        res.status(200).json({
            products:     result.products,
            page:         result.page,
            hasNextPage:  result.hasNextPage,
            hasPrevPage:  result.hasPrevPage,
            nextPage:     result.nextPage,
            prevPage:     result.prevPage
        })
            
        } catch (error) {
            console.error("error al obtener los productos", error)
            res.status(500).render("error", {error, message: "error al obtener los productos"})
        }

        
    }




    createProduct = async(req, res) => {

        const { title, description, price, thumbnails, code, stock } = req.body

        try {
            
            const newProduct = await this.productsService.createProduct({ title, description, price, thumbnails, code, stock })

            if(!newProduct){
                throw new Error ("No se pudo crear el nuevo producto")
            }

            res.send({
                status: "success",
                message: "El producto se ha creado correctamente",
                payload: newProduct
            })

        } catch (error) {

            console.error ("Error en el createProduct")
            

            res.status(500).send({
                status: "error",
                message: "Error en el createProduct",
                error: error.message
            })
            
        }
    }


    updateProduct = async (req, res) => {

        const { id } = req.params
        const dataProducUpdate = req.body

        console.log("Datos recibidos para la actualización: ", dataProducUpdate)

        try {

            // Lista de campos permitidos para la actualización
            const allowedFields = ["title", "description", "price", "thumbnails", "code", "stock"];

            // Construir el objeto con solo los campos válidos y definidos
            const updateData = {};
            Object.keys(dataProducUpdate).forEach(field => {
                if (allowedFields.includes(field) && dataProducUpdate[field] !== undefined) {
                    updateData[field] = dataProducUpdate[field];
                }
            });

            // Si no hay campos válidos en la actualización, se devuelve un error
            if (Object.keys(updateData).length === 0) {
                throw new Error("Debe proporcionar al menos un campo válido para actualizar");
            }


            const updatedProduct = await this.productsService.updateItem (id, updateData)


            if(!updatedProduct){ throw new Error ("error al actualizar el producto")}

            
            res.send({
                status: "success",
                message: "Producto actualizado correctamente",
                payload: updatedProduct
            })

        } catch (error) {
            console.error("Error en el updateProduct", error)
            res.status(500).render("error", {error, message: "Error en el updateProduct" })
        }

    }

    

    deleteProduct = async (req, res) =>{

        const { id } = req.params

        try {
            const deletedProduct = await this.productsService.deleteItem(id)

            if(!deletedProduct){
                throw new Error ("Error al eliminar el producto")
            }

            res.send({
                status: "success",
                message: `El producto con ID ${id} fue eliminado exitosamente`

            })

        } catch (error) {

            res.status(500).send({
                status: "error",
                message: "error en el delete product",
                error: error.message

            })
            
        }
    }
}

module.exports = new ProductsController()