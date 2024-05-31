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





