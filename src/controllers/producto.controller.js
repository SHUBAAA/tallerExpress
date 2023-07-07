import nodemailer from 'nodemailer';
import { productModel, boletaModel, carritoModel } from "../models/producto.model.js";

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
        const producto = await productModel.findOne({ _id: prodId });
        res.send(producto);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function venderProducto(req, res) {
    const { productoId, cantidad } = req.body;

    try {

        const producto = await productModel.findById(productoId);

        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        if (producto.cantidad < cantidad) {
            return res.status(400).json({ message: 'No hay suficiente cantidad disponible' });
        }


        producto.cantidad -= cantidad;


        await producto.save();

        const carritoItem = new carritoModel({
            nombre: producto.nombre,
            categoria: producto.categoria,
            cantidad: cantidad,
            precio: producto.precio
        });
        await carritoItem.save();

        res.status(200).json({ message: 'Venta realizada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al realizar la venta' });
    }
};

async function getCarrito(req, res) {
    try {
        const product = await carritoModel.find({});
        return res.send(product);
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Error al obtener producto', error: err.message });
    }
}

async function guardarCarritoEnBoleta(req, res) {
    try {
        const carrito = await carritoModel.find({});

        if (carrito.length === 0) {
            return res.status(400).json({ message: 'El carrito de compra está vacío' });
        }

        const totalVenta = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);

        const boleta = new boletaModel({
            productos: carrito,
            totalVenta: totalVenta,
        });

        await boleta.save();
        await carritoModel.deleteMany({});

        const correoDestinatario = req.body.correo;

        if (correoDestinatario) {
            sendMail(boleta, correoDestinatario);
        }

        res.status(200).json({ message: 'Carrito guardado en boleta con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al guardar el carrito en la boleta' });
    }
}



async function eliminarProducto(req, res) {
    try {
        const productoId = req.body.productoId;
        const productocarrito = await carritoModel.findById(productoId);
        const cantidadProductoCarrito = productocarrito.cantidad;

        await productModel.findOneAndUpdate({ nombre: productocarrito.nombre }, { $inc: { cantidad: cantidadProductoCarrito } });

        await carritoModel.deleteOne({ _id: productoId });

        res.status(200).json({ message: 'Producto eliminado del carrito y cantidad devuelta al inventario' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar producto' });
    }
}

async function getBoleta(req, res) {
    try {
        const boleta = await boletaModel.find({});
        return res.send(boleta);
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Error al obtener Boleta' });
    }
}

function sendMail(boleta, correoDestinatario) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 's.lefiqueo01@ufromail.cl',
            pass: 'saul2022'
        }
    });

    let body = 'Detalle de la boleta:\n\n';
    for (const producto of boleta.productos) {
        body += `Nombre: ${producto.nombre}\n`;
        body += `Categoria: ${producto.categoria}\n`;
        body += `Cantidad: ${producto.cantidad}\n`;
        body += `Precio: $${producto.precio}\n`;
        body += '\n';
    }
    body += `Total Venta: $${boleta.totalVenta}\n`;

    let mailOptions = {
        from: 'tuEmail@gmail.com',
        to: correoDestinatario,
        subject: 'Detalle de tu boleta',
        text: body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error al enviar el correo electrónico: ', error);
        } else {
            console.log('Correo electrónico enviado: ', info.response);
        }
    });
}


export { createProduct, getProduct, deleteProductById, updateProductById, getProductById, venderProducto, getCarrito, guardarCarritoEnBoleta, eliminarProducto, getBoleta };
