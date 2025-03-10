const { usersModel } = require("../models/users.model")
const mongoosePaginate = require ("mongoose-paginate-v2")
const mongoose = require("mongoose")

// Este es el DAO ((Data Access Object) es un patrón de diseño que maneja el acceso a la base de datos) y se comunica directamente con la base de datos

class UsersDaoMongo {


    constructor (){
        this.accesoAlUsersModel = usersModel
        // console.log("User Instance Created") 
    }



    async getAll (page = 1, limit) {
        try {
            console.log(`Paginación: Página ${page}, Límite ${limit}`)
            const options = {
                page,
                limit,
                lean: true      
            }

            const allUsers = await this.accesoAlUsersModel.paginate({}, options)

    
            return {
                users: allUsers.docs,
                totalDocs: allUsers.totalDocs,
                hasNextPage: allUsers.hasNextPage,
                hasPrevPage: allUsers.hasPrevPage,
                nextPage: allUsers.nextPage,
                prevPage: allUsers.prevPage,
                page: allUsers.page
            }
        } catch (error) {
            console.error(`Error: ${error.message}`)
            throw error
        }
    }
    



    async create(userData){

        try{

            const createdUser = await this.accesoAlUsersModel.create(userData) 
            // Este createdUser es el que viaja de regreso por todas las capas hasta llegar al controlador.
            // createdUser (obtenido de la BD) 1 de 5 flujo de retorno de datos

            if(!createdUser){
                throw new Error ("No se pudo crear el Usuario")
            }

            return createdUser
            //  return createdUser; en UserDaoMongo.create() 2 de 5 flujo de retorno de datos

        }catch(error){
            console.error (`Error: ${error.message}`)
                throw error
        }
    }



    async getBy(filter) {
        try {
            const user = await this.accesoAlUsersModel.findOne(filter)
            // Si encuentra al usuario, lo devuelve
            return user
    
        } catch (error) {
            console.error(`Error al obtener el usuario: ${error.message}`)
            throw error
        }
    }
    

    async update(id, updateDataUser) {

            try {
                
                const updatedUser = await this.accesoAlUsersModel.findByIdAndUpdate(id, updateDataUser, { new: true })

                return updatedUser

            } catch (error) {
                console.error (`Error: ${error.message}`)

                throw error
            }
    }



    async delete(id){
        try {
            if(!mongoose.Types.ObjectId.isValid(id)){
                throw new Error ("El Id proporcionado no es Válido")
            }

            const deletedUser = await this.accesoAlUsersModel.findByIdAndDelete(id)

            if(!deletedUser){
                throw new Error ("El usuario no existe o no puede ser eliminado")
            }

            return { 
                message: "Usuario eliminado con éxito",
                user: deletedUser
            }

        } catch (error) {
            console.error(`Error al eliminar el usuario: ${error.message}`)

            throw error
        }
    }
}

module.exports = new UsersDaoMongo ()