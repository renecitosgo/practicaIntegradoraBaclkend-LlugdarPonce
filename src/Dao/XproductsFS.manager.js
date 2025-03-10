// import express from "express"

// import fs from 'fs/promises'



// class ProductManager {
//     constructor(path){
//         this.products = []
//         this.id = 0
//         this.path = path
//         this.loadProducts()
//     }

//     getProducts () {
//         return this.products

//     }

//     getProductById (id) {
//         const product = this.products.find(product => product.id === id)
//         if (!product){
//             throw new Error ("No se encontró un producto con este ID 🤔")
//         }
//         return product
//     }

//     addProducts(title, description, price, thumbnails, code, stock) {
//         const existingProduct = this.products.find(product => product.code === code)
//         if (existingProduct) {
//             throw new Error("Ya existe un producto con este mismo código 🤗")
//         }
//         this.products.push({ id: this.id++, title, description, price, thumbnails, code, stock })
//     }

//     addMultipleProducts(productArray) { 
//         productArray.forEach(product => {
//             const { title, description, price, thumbnails, code, stock } = product
//             this.addProducts(title, description, price, thumbnails, code, stock)
//         })
//     }

//     deleteProductById (id) {
//         const index = this.products.findIndex(product => product.id === id)
            
//         if (index === -1){
//             throw new Error ("No se encontró para eliminar, un producto con este ID 🤔")
//         }
//         this.products.splice(index, 1)
//         this.saveProducts()
//     }

//     updateProductById (id, newData) {

//         const index = this.products.findIndex(product => product.id === id)
            

//         if (index === -1){
//             throw new Error ("No se encontró un producto con este ID 🤔")
//         }

//         if ( "id" in newData  && newData.id !== id )
//             throw new Error ("No se permite actualizar el Id de un Producto 🌩️💔")

//         this.products[index] = {...this.products[index], ...newData}
        
//         this.saveProducts()
        
//     }  


//     async saveProducts() {
//         try {
//             await fs.access(this.path, fs.constants.W_OK) 
//             await fs.writeFile(this.path, JSON.stringify(this.products))
//             console.log("Productos guardados correctamente 🙂")
//         } catch(error) {
//             console.error("Error al guardar los productos:", error)
//         }
//     }
    
//     async loadProducts() {
//         try {
//             await fs.access(this.path, fs.constants.R_OK) 
//             const stats = await fs.stat(this.path)
//             if (!stats.isFile()) {
//                 throw new Error("El path no corresponde a un archivo 💔🌩️")
//             }
//             const data = await fs.readFile(this.path, 'utf8')
//             this.products = JSON.parse(data)
//             this.id = this.products.length
//         } catch (error) {
//             console.error("Error al cargar los productos", error)
//         }
//     }
// }


// export default ProductManager


