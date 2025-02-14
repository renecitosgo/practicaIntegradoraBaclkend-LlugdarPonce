const { Router } = require("express")
const usersManager = require ("../../dao/usersMongo.manager") //requiero la instancia pre-creada en en manager: module.exports = new UsersManager () y le asigno un nombre (singleton)... podría requerir la clase pero pero tendría que evocar a New para cada vez que quiera instanciar...le puedo poner el nombre que quiera...
const mongoose = require ("mongoose")
const auth = require("../../middlewares/auth.middleware")

const router = Router()



router.get("/", async (req, res) => {

    try{
        const users = await usersManager.getAllUsers()

        res.send({status: "success", payload: users})

    }catch(error){

        res.status(500).send({error: "error", error: error.message})

    }
})


router.post("/",auth, async (req, res) => {
// se supone que esta ruta estáprotegida para que la creación de usuarios se las haga a travez del register de sessions router y que esta solo pueda ser usada por los admin para alguna situación específica ...

    const createDataUser = req.body

    const { first_name, last_name, email} = createDataUser



    if(!first_name || !last_name || !email) {

        return res.status(400).send({error: "Faltan datos obligatorios"})
    }


    try{        
        const newUser = await usersManager.createUser(req.body)

        res.send({status:"success", payload: newUser})

    }catch(error){

        res.status(500).send({error: "error", error: error.message})
    }
    
})


router.get("/:uid", async (req, res)=>{

    const { uid } = req.params

    if(!mongoose.Types.ObjectId.isValid(uid))
        return res.status(400).send({status: "error", message: "El formato del ID no es Válido"})

    try{
        const userFound = await usersManager.getUserById(uid)

        if(!userFound){
            return res.status(404).send({status: "error", message: "Usuario no encontrado"})      
        }

        res.send({status: "success", payload: userFound}) 

    }catch(error){
        res.status(500).send({status: "error", message: "Error al buscar el usuario", error: error.message})
    }

})


router.put("/:uid", async (req, res)=>{

    const { uid } = req.params
    const updateDataUser = req.body


    if(!mongoose.Types.ObjectId.isValid(uid))
        return res.status(400).send({status: "error", message: "El formato del ID no es válido"})

    try{

        const userUpdate = await usersManager.updateUserById(uid, updateDataUser)

        if (!userUpdate) {
            return res.status(404).send({status: "error", message: "Usuario no encontrado"})
        }

        res.send({status: "success", message: "Update User", payload: userUpdate})

    }catch(error){
        res.status(500).send({status: "error", message: "Error al actualizar el usuario", error: error.message})
    }

    
})



router.delete("/:uid", async (req, res)=>{

    const { uid } = req.params

    if(!mongoose.Types.ObjectId.isValid(uid))
        return res.status(400).send({status: "error", message: "El formato del Id no es Válido"})

    try{
        const userDeleted = await usersManager.deleteUserById (uid)

        if(!userDeleted){
            return res.status(404).send({status: "error", message: "El usuario no fue encontrado"})
        }

        res.send({status: "success", message: "Usuario eliminado correctamente", payload: userDeleted})


    }catch(error){
        return res.status(500).send({status: "error", message: "Ocurrió un error al intentar eliminar el usuario", error: error.message})

    }

})



module.exports = router 






