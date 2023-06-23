import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    fecha: {
      type: Date,
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

const productModel = mongoose.model('Product', productSchema);

export default productModel;