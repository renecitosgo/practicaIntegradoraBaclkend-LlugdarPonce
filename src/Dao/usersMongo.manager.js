const { usersModel } = require("../models/users.model")
const mongoosePaginate = require ("mongoose-paginate-v2")


class UsersManager {


    constructor (){
        this.accesoAlUsersModel = usersModel
        console.log("User Instance Created")
    }



    async getAllUsers(page = 1, limit = 5) {
        try {
            const options = {
                page,
                limit,
                lean: true
            }

            const allUsers = await this.accesoAlUsersModel.paginate({}, options)

            if(!allUsers.docs.length){
                throw new Error ("No se pudo traer a los usuarios, quizá no existan")
            }
    
            return {
                users: allUsers.docs,
                totalDocs: allUsers.totalDocs,
                hasNextPage: allUsers.totalPages,
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
    



    async createUser(userData){

        try{

            const createdUser = await this.accesoAlUsersModel.create(userData)

            if(!createdUser){
                throw new Error ("No se pudo crear el Usuario")
            }

            return createdUser

        }catch(error){
            console.error (`Error: ${error.message}`)
                throw error
        }
    }



    async getUserBy(filter) {
        try {
            console.log("Filtro utilizado para la búsqueda:", filter)
            const user = await this.accesoAlUsersModel.findOne(filter)
            console.log("Resultado de la búsqueda:", user)
        
            // Si encuentra al usuario, lo devuelve
            return user
    
        } catch (error) {
            console.error(`Error al obtener el usuario: ${error.message}`)
            throw error
        }
    }
    

    async updateUserById(id, updateDataUser) {

            try {
                if(!monggose.Types.ObjectId.isValid(id)){
                    throw new Error ("El ID proporcionado no es válido")
                }

                if(!updateDataUser || Object.keys(updateDataUser).length === 0){
                    throw new Error ("Los datos de actualización no pueden estar vacíos.")
                }


                const updatedUser = await this.accesoAlUsersModel.findByIdAndUpdate(id, updateDataUser, { new: true })

                if(!updatedUser){
                    throw new Error ("No se pudo actualizar el usuario")
                }

                return updatedUser

            } catch (error) {
                console.error (`Error: ${error.message}`)

                throw error
            }
    }



    async deleteUserById(id){
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

module.exports = new UsersManager ()