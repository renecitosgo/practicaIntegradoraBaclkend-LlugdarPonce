const OrderModel = require("../models/order.model")
const mongoose = require('mongoose')

console.log(OrderModel)

async function insertBatteries(batteries) {
    try {
        if (!OrderModel) {
            throw new Error("OrderModel no está definido")
        }

        const result = await OrderModel.insertMany(batteries)
        console.log("Baterías insertadas correctamente", result)
    } catch (error) {
        console.error("Error al insertar baterías", error)
    }
}

class OrderManager {
    constructor() {
        console.log('OrdersManager instance creada')
    }

    async getAllOrders() {
        // return await OrderModel.find({})
        try {
            const orders = await OrderModel.find({})
            return orders
        } catch (error) {
            console.error('Error al obtener órdenes', error)
            throw error
        }
        // const orders = await OrderModel.paginate();
        return orders;
    }
}

// Array batteries para insertar en mongo masivamente

const batteries = [
    {
        title: "Batería de Litio 18650",
        description: "Batería recargable de 3.7V con alta capacidad de 2500mAh.",
        price: 12.99,
        thumbnails: ["https://example.com/images/lithium_18650_1.jpg", "https://example.com/images/lithium_18650_2.jpg"],
        code: "BATT18650",
        size: "livianas",
        stock: 150
    },
    {
        title: "Batería de Plomo-Ácido 12V 7Ah",
        description: "Batería sellada de plomo-ácido ideal para sistemas de energía solar y UPS.",
        price: 35.50,
        thumbnails: ["https://example.com/images/lead_acid_12v_7ah_1.jpg", "https://example.com/images/lead_acid_12v_7ah_2.jpg"],
        code: "BATTLA127",
        size: "livianas",
        stock: 75
    },
    {
        title: "Batería de Níquel-Cadmio (NiCd) AA",
        description: "Batería recargable de 1.2V con capacidad de 1000mAh, ideal para juguetes y linternas.",
        price: 3.25,
        thumbnails: ["https://example.com/images/nicd_aa_1.jpg", "https://example.com/images/nicd_aa_2.jpg"],
        code: "BATTNICDAA",
        size: "livianas",
        stock: 300
    },
    {
        title: "Batería de Litio Polímero 3.7V 1000mAh",
        description: "Batería de Li-Po recargable, ligera y de alta eficiencia.",
        price: 15.00,
        thumbnails: ["https://example.com/images/lipo_1000mah_1.jpg", "https://example.com/images/lipo_1000mah_2.jpg"],
        code: "BATTLP1000",
        size: "livianas",
        stock: 200
    },
    {
        title: "Batería de Plomo-Ácido 6V 4.5Ah",
        description: "Ideal para juguetes eléctricos y pequeños dispositivos de respaldo.",
        price: 20.99,
        thumbnails: ["https://example.com/images/lead_acid_6v_4.5ah_1.jpg", "https://example.com/images/lead_acid_6v_4.5ah_2.jpg"],
        code: "BATTLA645",
        size: "livianas",
        stock: 120
    },
    {
        title: "Batería de Níquel-Hidruro Metálico (NiMH) AAA",
        description: "Batería recargable de 1.2V con capacidad de 800mAh, amigable con el medio ambiente.",
        price: 2.99,
        thumbnails: ["https://example.com/images/nimh_aaa_1.jpg", "https://example.com/images/nimh_aaa_2.jpg"],
        code: "BATTNIMHAAA",
        size: "livianas",
        stock: 500
    },
    {
        title: "Batería de Litio CR2032",
        description: "Batería de botón de 3V, comúnmente utilizada en relojes y dispositivos pequeños.",
        price: 1.50,
        thumbnails: ["https://example.com/images/lithium_cr2032_1.jpg", "https://example.com/images/lithium_cr2032_2.jpg"],
        code: "BATTCR2032",
        size: "livianas",
        stock: 1000
    },
    {
        title: "Batería de Plomo-Ácido 12V 35Ah",
        description: "Batería de alta capacidad para sistemas solares y aplicaciones industriales.",
        price: 85.00,
        thumbnails: ["https://example.com/images/lead_acid_12v_35ah_1.jpg", "https://example.com/images/lead_acid_12v_35ah_2.jpg"],
        code: "BATTLA1235",
        size: "livianas",
        stock: 50
    },
    {
        title: "Batería de Litio 21700",
        description: "Batería recargable de 3.7V con capacidad de 4000mAh, ideal para dispositivos de alta demanda.",
        price: 18.00,
        thumbnails: ["https://example.com/images/lithium_21700_1.jpg", "https://example.com/images/lithium_21700_2.jpg"],
        code: "BATT21700",
        size: "livianas",
        stock: 80
    },
    {
        title: "Batería de Níquel-Cadmio (NiCd) C",
        description: "Batería recargable de 1.2V con capacidad de 2200mAh, utilizada en herramientas eléctricas.",
        price: 4.50,
        thumbnails: ["https://example.com/images/nicd_c_1.jpg", "https://example.com/images/nicd_c_2.jpg"],
        code: "BATTNICDC",
        size: "livianas",
        stock: 150
    },
    {
        title: "Batería de Litio Polímero 3.7V 2000mAh",
        description: "Batería de Li-Po de alta capacidad y rendimiento.",
        price: 25.00,
        thumbnails: ["https://example.com/images/lipo_2000mah_1.jpg", "https://example.com/images/lipo_2000mah_2.jpg"],
        code: "BATTLP2000",
        size: "livianas",
        stock: 90
    },
    {
        title: "Batería de Plomo-Ácido 6V 12Ah",
        description: "Batería de alta capacidad para aplicaciones de respaldo y energía solar.",
        price: 40.00,
        thumbnails: ["https://example.com/images/lead_acid_6v_12ah_1.jpg", "https://example.com/images/lead_acid_6v_12ah_2.jpg"],
        code: "BATTLA612",
        size: "livianas",
        stock: 65
    },
    {
        title: "Batería de Níquel-Hidruro Metálico (NiMH) D",
        description: "Batería recargable de 1.2V con capacidad de 4000mAh, para dispositivos de alta demanda.",
        price: 6.99,
        thumbnails: ["https://example.com/images/nimh_d_1.jpg", "https://example.com/images/nimh_d_2.jpg"],
        code: "BATTNIMHD",
        size: "maquinarias",
        stock: 300
    },
    {
        title: "Batería de Litio CR123A",
        description: "Batería de litio de 3V utilizada en cámaras y dispositivos de seguridad.",
        price: 3.50,
        thumbnails: ["https://example.com/images/lithium_cr123a_1.jpg", "https://example.com/images/lithium_cr123a_2.jpg"],
        code: "BATTCR123A",
        size: "maquinarias",
        stock: 250
    },
    {
        title: "Batería de Plomo-Ácido 12V 100Ah",
        description: "Batería de alta capacidad para aplicaciones industriales y sistemas de energía.",
        price: 200.00,
        thumbnails: ["https://example.com/images/lead_acid_12v_100ah_1.jpg", "https://example.com/images/lead_acid_12v_100ah_2.jpg"],
        code: "BATTLA12100",
        size: "maquinarias",
        stock: 30
    },
    {
        title: "Batería de Litio 14500",
        description: "Batería recargable de 3.7V con capacidad de 800mAh, similar en tamaño a una AA.",
        price: 7.50,
        thumbnails: ["https://example.com/images/lithium_14500_1.jpg", "https://example.com/images/lithium_14500_2.jpg"],
        code: "BATT14500",
        size: "maquinarias",
        stock: 400
    },
    {
        title: "Batería de Níquel-Cadmio (NiCd) Sub-C",
        description: "Batería recargable de 1.2V con capacidad de 1800mAh, utilizada en herramientas eléctricas.",
        price: 3.75,
        thumbnails: ["https://example.com/images/nicd_subc_1.jpg", "https://example.com/images/nicd_subc_2.jpg"],
        code: "BATTNICDSC",
        size: "maquinarias",
        stock: 200
    },
    {
        title: "Batería de Litio Polímero 7.4V 2200mAh",
        description: "Batería de Li-Po de alta capacidad y rendimiento para drones y RC.",
        price: 35.00,
        thumbnails: ["https://example.com/images/lipo_7.4v_2200mah_1.jpg", "https://example.com/images/lipo_7.4v_2200mah_2.jpg"],
        code: "BATTLP742200",
        size: "maquinarias",
        stock: 70
    },
    {
        title: "Batería de Plomo-Ácido 6V 7Ah",
        description: "Batería sellada de plomo-ácido para sistemas de respaldo y juguetes eléctricos.",
        price: 22.00,
        thumbnails: ["https://example.com/images/lead_acid_6v_7ah_1.jpg", "https://example.com/images/lead_acid_6v_7ah_2.jpg"],
        code: "BATTLA67",
        size: "maquinarias",
        stock: 110
    },
    {
        title: "Batería de Níquel-Hidruro Metálico (NiMH) 9V",
        description: "Batería recargable de 9V con capacidad de 200mAh, ideal para detectores de humo.",
        price: 7.99,
        thumbnails: ["https://example.com/images/nimh_9v_1.jpg", "https://example.com/images/nimh_9v_2.jpg"],
        code: "BATTNIMH9V",
        size: "maquinarias",
        stock: 140
    },
    {
        title: "Batería de Litio 9V",
        description: "Batería de litio de larga duración para aplicaciones críticas.",
        price: 10.00,
        thumbnails: ["https://example.com/images/lithium_9v_1.jpg", "https://example.com/images/lithium_9v_2.jpg"],
        code: "BATT9V",
        size: "maquinarias",
        stock: 90
    },
    {
        title: "Batería de Plomo-Ácido 12V 55Ah",
        description: "Batería de alta capacidad para energía solar y aplicaciones de respaldo.",
        price: 120.00,
        thumbnails: ["https://example.com/images/lead_acid_12v_55ah_1.jpg", "https://example.com/images/lead_acid_12v_55ah_2.jpg"],
        code: "BATTLA1255",
        size: "maquinarias",
        stock: 45
    },
    {
        title: "Batería de Litio 26650",
        description: "Batería recargable de 3.7V con capacidad de 5000mAh, ideal para dispositivos de alta demanda.",
        price: 20.00,
        thumbnails: ["https://example.com/images/lithium_26650_1.jpg", "https://example.com/images/lithium_26650_2.jpg"],
        code: "BATT26650",
        size: "servicioPesado",
        stock: 60
    },
    {
        title: "Batería de Níquel-Cadmio (NiCd) AA",
        description: "Batería recargable de 1.2V con capacidad de 600mAh, ideal para linternas y radios.",
        price: 2.50,
        thumbnails: ["https://example.com/images/nicd_aa_600mah_1.jpg", "https://example.com/images/nicd_aa_600mah_2.jpg"],
        code: "BATTNICDAA600",
        size: "servicioPesado",
        stock: 350
    },
    {
        title: "Batería de Litio Polímero 11.1V 1500mAh",
        description: "Batería de Li-Po para drones y RC de alto rendimiento.",
        price: 45.00,
        thumbnails: ["https://example.com/images/lipo_11.1v_1500mah_1.jpg", "https://example.com/images/lipo_11.1v_1500mah_2.jpg"],
        code: "BATTLP111500",
        size: "servicioPesado",
        stock: 50
    },
    {
        title: "Batería de Plomo-Ácido 6V 10Ah",
        description: "Batería de alta capacidad para aplicaciones de respaldo y juguetes eléctricos.",
        price: 30.00,
        thumbnails: ["https://example.com/images/lead_acid_6v_10ah_1.jpg", "https://example.com/images/lead_acid_6v_10ah_2.jpg"],
        code: "BATTLA610",
        size: "servicioPesado",
        stock: 85
    },
    {
        title: "Batería de Níquel-Hidruro Metálico (NiMH) AA",
        description: "Batería recargable de 1.2V con capacidad de 2000mAh, para uso diario.",
        price: 3.00,
        thumbnails: ["https://example.com/images/nimh_aa_2000mah_1.jpg", "https://example.com/images/nimh_aa_2000mah_2.jpg"],
        code: "BATTNIMHAA2000",
        size: "servicioPesado",
        stock: 400
    },
    {
        title: "Batería de Litio CR2025",
        description: "Batería de botón de 3V, comúnmente utilizada en relojes y dispositivos pequeños.",
        price: 1.75,
        thumbnails: ["https://example.com/images/lithium_cr2025_1.jpg", "https://example.com/images/lithium_cr2025_2.jpg"],
        code: "BATTCR2025",
        size: "servicioPesado",
        stock: 950
    },
    {
        title: "Batería de Plomo-Ácido 12V 75Ah",
        description: "Batería de alta capacidad para aplicaciones industriales y sistemas de energía.",
        price: 150.00,
        thumbnails: ["https://example.com/images/lead_acid_12v_75ah_1.jpg", "https://example.com/images/lead_acid_12v_75ah_2.jpg"],
        code: "BATTLA1275",
        size: "servicioPesado",
        stock: 35
    },
    {
        title: "Batería de Litio 10440",
        description: "Batería recargable de 3.7V con capacidad de 350mAh, similar en tamaño a una AAA.",
        price: 5.00,
        thumbnails: ["https://example.com/images/lithium_10440_1.jpg", "https://example.com/images/lithium_10440_2.jpg"],
        code: "BATT10440",
        size: "servicioPesado",
        stock: 300
    }
];

// insertBatteries(batteries)


module.exports = { insertBatteries, batteries, OrderManager }
