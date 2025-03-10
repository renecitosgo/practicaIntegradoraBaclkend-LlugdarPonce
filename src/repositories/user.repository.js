const ClassRepository  = require("./class.repository")
const mongoose = require("mongoose")

// Este es el servicio de repositorio, usa el DAO y aplica reglas de Negocio si es necesario

class UserRepository extends ClassRepository {
    constructor(dao){
        console.log("UserRepository class created")

        super(dao)

    }

    async getUser(filter){
        try {
            if(!filter || Object.keys(filter).length === 0 ) {
                throw new Error ("El filtro es obligatorio para buscar un usuario.")
            }
            if(filter._id && !mongoose.isValidObjectId(filter._id))
                throw new Error("El formato del ID no es Válido")

            const userFound = await super.getItem(filter)

            if(!userFound){
                throw new Error("Usuario no encontrado")      
            }

        return userFound

            
        } catch (error) {
            console.error(`Error en getItem ${error.message}`)
            throw error
        }

    }



    async getUsers (page, limit){

        const allUsers = await super.getItems(page, limit)

        if(!allUsers.docs.length){
            throw new Error ("No se pudo traer a los usuarios, quizá no existan!")
        }

        return allUsers
    }



    async createUser (newUser) {

        if (!newUser.first_name || !newUser.last_name || !newUser.email || !newUser.password) {
            throw new Error ("Faltan datos obligatorios")
        }

            const userExist = await super.getItem({ email: newUser.email })
    
        if (userExist) {
            throw new Error ("Usuario ya existe")
        }

        const createdUser = await super.createItem(newUser);

        if (!createdUser) {
            throw new Error("No se pudo crear el usuario");
        }

        return createdUser;
        // return createdUser:  de 5 flujo de retorno de datos
    }



    async updateUser (id, itemUpdate) {

        try {
            if(!mongoose.isValidObjectId(id)){
                throw new Error ("El ID proporcionado no es válido")
            }

            if(!itemUpdate || Object.keys(itemUpdate).length === 0){
                throw new Error ("Los datos de actualización no pueden estar vacíos.")
            }

            const updateUser = await super.updateItem(id, itemUpdate)

                if(!updateUser){
                    throw new Error ("No se pudo actualizar el Usuario")
                }

            return updateUser    

            
        } catch (error) {
            console.error(`error en el updateItem: ${error.message}`)
            throw error
        }
    }
        



    async deleteUser (id) {

        try {

            if(!id){
                throw new Error ("No se especificó el ID")
            }

            if(!mongoose.isValidObjectId(id))
                throw new Error("El formato del Id no es Válido")

        
            const deletedUser = await super.deleteItem(id)

            if(!deletedUser){
                throw new Error ("El usuario no fue encontrado")
            }
        
            
            return deletedUser

        } catch (error) {

            console.error(`error en el deletedItem ${error.message}`)
            throw error

        }

    }
}

module.exports = UserRepository

