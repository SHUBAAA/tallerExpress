import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    categoria: {
      type: String,
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

const boletaSchema = new mongoose.Schema(
  {
    productos: {
      type: [productSchema],
      required: true,
    },
    totalVenta: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model('Producto', productSchema);
const boletaModel = mongoose.model('Boleta', boletaSchema);
const carritoModel = mongoose.model('Carrito', productSchema)

export { productModel, boletaModel, carritoModel };
