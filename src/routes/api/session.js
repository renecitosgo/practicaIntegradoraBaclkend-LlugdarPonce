const RouterClass = require("../api/router");

class SessionRouter extends RouterClass {
    constructor() {
        super(); // Llama al constructor de la clase base
        console.log("SessionRouter instance created");

        // Llama explícitamente al método init()
        this.init();
        console.log("Método init() llamado en constructor de SessionRouter.");
    }

    init() {
        console.log("Inicializando rutas de SessionRouter...");

        // Registrar la ruta /login
        this.get("/login", (req, res) => {
            console.log("Ruta /login ejecutada");
            res.send("Hola desde SessionRouter extends RouterClass");
        });

        // Registrar la ruta /
        this.get("/", ["PUBLIC"], async (req, res) => {
            try {
                const response = "Hola chango con middleware interno!";
                res.sendSuccess(response); // Usa sendSuccess
                
            } catch (error) {
                res.sendServerError(error)
            }

            
        });

        console.log("Rutas de SessionRouter inicializadas.");
    }
}

module.exports = new SessionRouter();
