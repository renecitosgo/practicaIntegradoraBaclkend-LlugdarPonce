// import { Router } from "express"
// import ProductManager from "./ProductManager.js"


// const router = Router()

// const productManager = new ProductManager('./data/productos.json')



//     router.get('/', (req, res) => {

//         const productsList = productManager.getProducts()
//         const { limit } = req.query
    
//         if(limit){
//             const limitValue = parseInt(limit)
//             if(!isNaN(limitValue)){ 
//                 res.send({status: "success", payload: productsList})
//                 return
//             }
//         }
        
//         res.send({status: "success", payload: productsList})
//     })
    
    

//     router.get('/:pid', (req, res) => {

//         try {
//             const product = productManager.getProductById(Number(req.params.pid))
//             res.send({ status: "succsess", payload: product})
//         }catch (error) {
//             res.send({ status: "error 404", message: error.message })
//         }

//     })



//     router.post("/", (req, res)=>{

//         try{
//             if(Array.isArray(req.body)){

//                 productManager.addMultipleProducts(req.body)
                
//             } else {
//                 const { title, description, price, thumbnails, code, stock } = req.body

//                 req.body.thumbnails = Array.isArray(thumbnails) ? thumbnails : [thumbnails]


//                 productManager.addProducts(title, description, price, thumbnails, code, stock)
//                 productManager.saveProducts()
//             }
//             res.status(200).send({status: "success", message: "Producto(s) argerado(s) 🙂"})

//         }catch(error){
//             res.status(400).send({error: "error", message: error.message})
//         }
//     })



//     router.put('/:pid', (req, res) => {
//         try {
//             const { pid } = req.params
//             const newData = req.body
//             productManager.updateProductById(Number(pid), newData)
//             productManager.saveProducts()
//             res.send({ status: "success", message: "Producto actualizado correctamente 🤗" })
//         }catch (error) {
//             res.status(400).send({ status: "error", message: error.message })
//         }
//     })
