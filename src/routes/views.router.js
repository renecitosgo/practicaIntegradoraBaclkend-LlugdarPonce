const { Router } = require("express")
const { uploader } = require("../utils/multer.js")
const { productService } = require("../Dao/mongoViejos/productsMongo.manager.js")
const { insertBatteries, batteries } = require("../Dao/mongoViejos/orderMongo.manager.js")
const OrderModel = require("../models/order.model")
// const userService = require ("../dao/usersMongo.manager")
const userService = require("../services/index.js")
const authJwt = require("../middlewares/auth.middlewareJwt")

const router = Router()

router.get("/", (req, res) => {
    res.render("index")
})

router.get("/profile", (req, res) => {
    res.render("index")
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.get("/register", (req,res)=>{
    res.render("register")
})

router.get("/products", async (req, res) => {
    console.log('GET /products')
    try {

        const products = await productService.getAllProducts()

        console.log('Products fetched:', products)

        res.render("products", { products })

    } catch (error) {

        console.error('Error fetching products:', error)

        res.status(500).json({ error: error.message })
        
    }
})


router.get("/users",  async (req, res) => {
    try {
        const page = parseInt(req.query.numPage) || 1;
        const limit = req.query.limit ? parseInt(req.query.limit) : 2;

        console.log(`Ruta - Página: ${page}, Límite: ${limit}`); // 🔍 Debug

        const { users, hasNextPage, hasPrevPage, nextPage, prevPage } = 
            await userService.getItems(page, limit);

        res.render("users", {
            users,
            hasNextPage,
            hasPrevPage,
            nextPage,
            prevPage,
            page
        });
    } catch (error) {
        console.error("Error al obtener los usuarios:", error.message);
        res.status(500).send({ error: "Ocurrió un error al obtener los usuarios." });
    }
});







// Ruta para renderizar baterías:   
router.get("/batteriesGet", async (req, res) => {
    try {
        const options = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
            lean: true
        }

        const batteriesGet = await OrderModel.paginate({}, options)

        console.log(batteriesGet)
        console.log('Datos obtenidos:', batteriesGet)

        console.log('Rendering orders.batteries template')

        res.render("orders/batteries", {
            batterias: batteriesGet.docs, 
            hasNextPage: batteriesGet.hasNextPage,
            hasPrevPage: batteriesGet.hasPrevPage,
            nextPage: batteriesGet.nextPage,
            prevPage: batteriesGet.prevPage,
            page: batteriesGet.page
        })
    } catch (error) {
        console.error('Error al obtener baterías paginadas:', error.message)
        res.status(500).send(error)
    }
})


// Ruta para insertar baterías (no debería estar aqui un POST)
router.post("/insert-batteries", async (req, res) => {
    try {
        // Llama a insertBatteries solo cuando se accede a esta ruta
        await insertBatteries(batteries)
        res.status(201).json({ message: "Baterías insertadas correctamente" })
    } catch (error) {
        console.error("Error al insertar las baterías", error)
        res.status(500).json({ error: "Error al insertar baterías" })
    }
})


router.post("/upload-file", uploader.single("myFile"), (req, res) => {
    res.render("successFile")
})

module.exports = router
