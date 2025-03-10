const { Router } = require("express")
const usersControllers = require("../../controllers/users.controllers")
const auth = require("../../middlewares/auth.middleware")


const router = Router()
console.log("Cargando usuarios router");


const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = usersControllers

router.get("/", getUsers)
router.get("/:id", getUser)
router.post("/", createUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)




module.exports = router 






