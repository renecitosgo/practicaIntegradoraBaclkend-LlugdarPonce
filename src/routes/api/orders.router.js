const express = require('express');
const router = express.Router();
const OrderModel = require('../../models/order.model');

router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            lean: true
        };

        const result = await OrderModel.paginate({}, options);

        res.send({ status: "success", payload: result });
    } catch (error) {
        console.error('Error al obtener órdenes paginadas', error);
        res.status(500).send({ status: "error", message: error.message });
    }
});

module.exports = router;



/** PRUEBA DE PAGINATE
 * ],
    "totalDocs": 3720,
    "limit": 10,
    "totalPages": 372,
    "page": 1,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": true,
    "prevPage": null,
    "nextPage": 2
    }
 */





// --------------------------------------------------------------------------------------------
// Aunque no proporcionará los metadatos específicos de mongoose-paginate-v2, esta solución es ampliamente utilizada. SKIP aunque no tiene los metadatos que a vecess necesitamos
// ----------------------------------------------------------------------------------------------

// const express = require('express');
// const router = express.Router();
// const OrderModel = require('../../models/order.model');

// router.get('/', async (req, res) => {
//     try {
//         const { page = 1, limit = 10 } = req.query;

    
//         const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    
//         const result = await OrderModel.find({})
//             .skip(skip)
//             .limit(parseInt(limit, 10));

//         res.send({ status: "success", payload: result });
//     } catch (error) {
//         console.error('Error al obtener órdenes paginadas', error);
//         res.status(500).send({ status: "error", message: error.message });
//     }
// });

// module.exports = router;
