import Product from "../models/producto.model.js";


async function createProduct(req, res) {
    try {

        const name = req.body.name;
        const fecha = req.body.fecha;
        const categoria = req.body.categoria;
        const cantidad = req.body.cantidad;
        const precio = req.body.precio;


        if (!name) {
            return res.status(400).json({ success: false, message: 'Falta el campo name' });
        }
        if (!fecha) {
            return res.status(400).json({ success: false, message: 'Falta el campo fecha' });
        }
        if (!categoria) {
            return res.status(400).json({ success: false, message: 'Falta el campo categoria' });
        }
        if (!cantidad) {
            return res.status(400).json({ success: false, message: 'Falta el campo cantidad' });
        }


        const productCreated = await Product.create({ name: name, fecha: fecha, categoria: categoria, cantidad: cantidad, precio: precio });
        return res.status(200).json({ success: true, user: productCreated });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Error al crear el producto', error: err.message });
    }
}

async function getProduct(req, res) {
    try {
        const product = await Product.find({});
        return res.send(product);
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Error al obtener producto', error: err.message });
    }
}
async function deleteProductById(req, res) {
    try {

        const productId = req.params.productId;
        const product = await Product.deleteOne({ _id: productId });
        res.send(product);
    } catch (err) {
        res.status(500).send(err);
    }
}
async function updateProductById(req, res) {
    try {
        const productId = req.params.productId;
        const name = req.body.name;
        const fecha = req.body.fecha;
        const categoria = req.body.categoria;
        const cantidad = req.body.cantidad;
        const precio = req.body.precio;

        const productUpdated = await Product.updateOne({ _id: productId }, { name, fecha, categoria, cantidad, precio });
        res.send(productUpdated);
    } catch (err) {
        res.status(500).send(err);
    }
}
export { createProduct, getProduct, deleteProductById, updateProductById };