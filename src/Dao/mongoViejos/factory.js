// const { objectConfig } = require("../config/index")

// let ProductsDao
// let CartsDao
// let UsersDao

// switch (objectConfig.persistence) {
//     case MEMORY:
        
//         break;

//     case FS:
        
//     break;

//     default:

//     // MONGO

//         break;
// }


// ver esto:
// const { objectConfig } = require("../config/index");

// let ProductsDao;
// let CartsDao;
// let UsersDao;

// switch (objectConfig.persistence) {
//     case "MEMORY":
//         // Inicializa con implementaciones en memoria
//         ProductsDao = require("../dao/memory/ProductsDao");
//         CartsDao = require("../dao/memory/CartsDao");
//         UsersDao = require("../dao/memory/UsersDao");
//         break;

//     case "FS":
//         // Inicializa con implementaciones en archivos
//         ProductsDao = require("../dao/fs/ProductsDao");
//         CartsDao = require("../dao/fs/CartsDao");
//         UsersDao = require("../dao/fs/UsersDao");
//         break;

//     default:
//         // MONGO (por defecto)
//         ProductsDao = require("../dao/mongo/ProductsDao");
//         CartsDao = require("../dao/mongo/CartsDao");
//         UsersDao = require("../dao/mongo/UsersDao");
//         break;
// }

// // Exportar las variables en un objeto
// module.exports = { ProductsDao, CartsDao, UsersDao };
