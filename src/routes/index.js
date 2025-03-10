const { Router } = require("express")
const routerApp = Router()

// Importar rutas
const viewsRouter = require("./views.router.js")
const pruebasRouter = require ("./api/pruebas.js")
const sessionsRouter = require ("./api/session.router.js")
const SessionRouter = require ("./api/session.js")
const usersRouter = require("./api/users.router.js")
const productsRouter = require("./api/products.router.js")
const cartsRouter = require("./api/carts.router.js")
const ordersRouter = require("./api/orders.router.js")

// Configurar rutas


routerApp.use("/api/products", productsRouter)
routerApp.use("/api/users", usersRouter)
routerApp.use("/api/cart", cartsRouter)
routerApp.use("/api/orders", ordersRouter)
routerApp.use("/api/sessions", sessionsRouter)
routerApp.use("/api/sessions", SessionRouter.getRouter())

routerApp.use("/", viewsRouter)
routerApp.use("/pruebas", pruebasRouter)


// Registrar rutas en consola (para depuración)
console.log("Rutas registradas en routerApp:");
routerApp.stack.forEach((middleware) => {
    if (middleware.route) {
        console.log(`${Object.keys(middleware.route.methods).join(", ").toUpperCase()} ${middleware.route.path}`);
    } else if (middleware.name === 'router') {
        middleware.handle.stack.forEach((handler) => {
            if (handler.route) {
                console.log(`${Object.keys(handler.route.methods).join(", ").toUpperCase()} ${handler.route.path}`);
            }
        });
    }
});

// Exportar routerApp
module.exports = routerApp;