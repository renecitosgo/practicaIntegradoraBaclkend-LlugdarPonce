const { Router } = require("express")
const jwt = require("jsonwebtoken")

class RouterClass {
    constructor() {
        this.router = Router();
        console.log("RouterClass instance created");
    }

    getRouter = () => this.router;

    // Aplica callbacks de forma segura, manejando errores
    applyCallbacks = (callbacks) => {
        console.log("Procesando callbacks:", callbacks);
        return callbacks.map((callback) => async (...params) => {
            try {
                console.log("Ejecutando callback:", callback.name || "callback anónimo");
                await callback.apply(this, params);
            } catch (error) {
                console.log("Error en callback:", error);
                params[1].status(500).send({ status: "error", message: error.message });
            }
        });
    };

    // Genera métodos personalizados para las respuestas
    generateCustomResponse = (req, res, next) => {
        res.sendSuccess = (payload) => res.send({ status: "success", payload });
        res.sendServerError = (error) => res.send({ status: "error", error });
        res.sendSessionError = (error) => res.send({ status: "error", error });
        next();
    }


    handPolicies = (policies) => {
        return (req, res, next) => {
            if (policies[0] === "PUBLIC") return next();
    
            // el ejemplo es con headers -> Bearer oñ45iu3i56ubgptr9ubwpnriuwjn
            const authHeaders = req.headers.authorization;
            if (!authHeaders) return res.status(401).send({ status: "error", error: "Unauthorized" });
    
            const token = authHeaders.split(" ")[1];
    
            try {
                let userVerified = jwt.verify(token, "s3cr3t@Firma");
                if (!policies.includes(userVerified.role.toUpperCase())) {
                    return res.status(401).send({ status: "error", error: "Not permissions" });
                }
                req.user = userVerified; // Aquí debes asignar userVerified, no user
                next();
            } catch (error) {
                return res.status(401).send({ status: "error", error: "Invalid token" });
            }
        };
    }

    // Registrar rutas con middleware personalizado
    get = (path, policies, ...callbacks) => {
        this.router.get(
            path,
            (req, res, next) => this.generateCustomResponse(req, res, next), // Middleware para respuestas personalizadas
            this.handPolicies(policies),
            ...this.applyCallbacks(callbacks) // Aplica los callbacks procesados
        );
    };

    post = (path, policies, ...callbacks) => {
        this.router.post(
            path,
            (req, res, next) => this.generateCustomResponse(req, res, next), // Middleware para respuestas personalizadas
            this.handPolicies(policies),
            ...this.applyCallbacks(callbacks) // Aplica los callbacks procesados
        );
    }

    put = (path, policies, ...callbacks) => {
        this.router.put(
            path,
            (req, res, next) => this.generateCustomResponse(req, res, next), // Middleware para respuestas personalizadas
            this.handPolicies(policies),
            ...this.applyCallbacks(callbacks) // Aplica los callbacks procesados
        );
    }

    delete = (path, policies, ...callbacks) => {
        this.router.delete(
            path,
            (req, res, next) => this.generateCustomResponse(req, res, next), // Middleware para respuestas personalizadas
            this.handPolicies(policies),
            ...this.applyCallbacks(callbacks) // Aplica los callbacks procesados
        );
    }


}

module.exports = RouterClass;
