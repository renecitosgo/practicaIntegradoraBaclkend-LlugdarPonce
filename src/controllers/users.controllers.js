const { createHash } = require("../utils/bcrypt")
const { generateToken } = require('../utils/jsonwebtoken')
const filterSensitiveData = require("../utils/filterSensitiveData")
const userService = require("../services/index.js")
const { sendEmail } = require("../utils/sendEmail") 
const mongoose = require("mongoose")
const { ObjectId } = require("mongodb")     

// Controlador de usuarios: Envía una respuesta al CLIENTE! usa el userService para manejar la logica de las rutas. Solo llama al servicio y maneja la respuesta, sin preocuparse por reglas de negocio ni validaciones.
// Su única responsabilidad es recibir los datos, llamar al servicio/repositorio, y devolver una respuesta.

class UserController {
    constructor(){
        console.log("UserController - Create Instance")

        this.usersService = userService

    }

    getUser = async (req, res)=>{
    
        const { id } = req.params
    
        try{
            const userFound = await this.usersService.getItem({_id: new ObjectId(id)})
                
            res.send({status: "success", payload: userFound}) 
    
        }catch(error){
            res.status(500).send({ status: "error", message: error.message })
        }
    
    }


    getUsers = async (req, res) => {
        try {
            console.log("🚀 getUsers API llamada con URL:", req.originalUrl); // 🔍 Debug res.status(200).json
            const result = await this.usersService.getItems();
            console.log("📦 Datos enviados como JSON:", JSON.stringify(result, null, 2)); // 🔍 Debug res.status(200).json
            
            res.status(200).json({
                users: result.users, 
                page: result.page, 
                hasNextPage: result.hasNextPage, 
                hasPrevPage: result.hasPrevPage, 
                nextPage: result.nextPage, 
                prevPage: result.prevPage 
            });
    
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
            res.status(500).render("error", { error: "Error al obtener los usuarios" })
        }
    };



    createUser = async (req, res) => {
        const { first_name, last_name, email, password } = req.body
    
    
        console.log("Datos recibidos para registro:", req.body)
    
        try {
                
            const newUser = await this.usersService.createItem({
                first_name,
                last_name,
                email,
                password: createHash(password)
            })
            // 5 de 5: Finalmente, newUser en el controlador recibe el usuario creado
    
            console.log("Nuevo usuario creado:", newUser)
    
            // Generar token usando newUser en lugar de filteredUser
            const token = generateToken({
                id: newUser._id,
                email: newUser.email
            })
    
            // Enviar email de bienvenida
            const html = `<h1>Bienvenido ${newUser.first_name} ${newUser.last_name}</h1>
                        <p>Tu cuenta ha sido creada exitosamente.</p>`
    
            console.log("Preparando para enviar correo a:", newUser.email)
    
            await sendEmail({
                userMail: newUser.email,
                subject: `Bienvenido ${newUser.first_name}!`,
                html
            });
    
            res.cookie("coderCookieToken", token, {
                maxAge: 60 * 60 * 1000 * 24,
                httpOnly: true
            }).send({ status: "success" })
    
        } catch (error) {
            console.error("Error en el proceso de registro:", error.message)
            res.status(500).send({ status: "Error", message: error.message })
        }
    }

    




    updateUser = async (req, res) => {
        const { id } = req.params;
        const updateDataUser = req.body;

        try {
            const userUpdate = await this.usersService.updateItem(id, updateDataUser);
            res.send({ status: "success", message: "Update User", payload: userUpdate });
        } catch (error) {
            res.status(500).send({ status: "error", message: "Error al actualizar el usuario", error: error.message });
        }
    }



    deleteUser = async (req, res)=>{

        const { id } = req.params
    
        try{
            const userDeleted = await this.usersService.deleteItem(id)
    
            res.send({  status: "success", 
                        message: "Usuario eliminado correctamente",
                        payload: userDeleted
                    })
    
        }catch(error){
            return res.status(500).send({
                status: "error", 
                message: "Ocurrió un error al intentar eliminar el usuario", 
                error: error.message})
    
        }
    
    }

}

module.exports = new UserController();