import productModel from "../models/producto.model.js";


async function createProduct(req, res) {
    try {

        const nombre = req.body.nombre;
        const categoria = req.body.categoria;
        const cantidad = req.body.cantidad;
        const precio = req.body.precio;


        if (!nombre) {
            return res.status(400).json({ success: false, message: 'Falta el campo nombre' });
        }
        if (!categoria) {
            return res.status(400).json({ success: false, message: 'Falta el campo categoria' });
        }
        if (!cantidad) {
            return res.status(400).json({ success: false, message: 'Falta el campo cantidad' });
        }


        const productCreated = await productModel.create({ nombre: nombre, categoria: categoria, cantidad: cantidad, precio: precio });
        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Error al crear el producto', error: err.message });
    }
}

async function getProduct(req, res) {
    try {
        const product = await productModel.find({});
        return res.send(product);
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Error al obtener producto', error: err.message });
    }
}
async function deleteProductById(req, res) {
    try {

        const productId = req.params.productId;
        const product = await productModel.deleteOne({ _id: productId });
        res.send(product);
    } catch (err) {
        res.status(500).send(err);
    }
}
async function updateProductById(req, res) {
    try {
        const productId = req.params.productId;
        const nombre = req.body.nombre;
        const categoria = req.body.categoria;
        const cantidad = req.body.cantidad;
        const precio = req.body.precio;

        const productUpdated = await productModel.updateOne({ _id: productId }, { nombre: nombre, categoria: categoria, cantidad, precio });
        res.send(productUpdated);
    } catch (err) {
        res.status(500).send(err);
    }
}
async function getProductById(req, res) {
    try {
        const prodId = req.params.prodId;
        const producto = await productModel.findOne({ _id: prodId })
        res.send(producto)
    } catch (err) {
        res.status(500).send(err);
    }

}
export { createProduct, getProduct, deleteProductById, updateProductById, getProductById };