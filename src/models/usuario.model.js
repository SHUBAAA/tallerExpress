import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contrasena: {
        type: String,
        required: true,
    },
    rut: {
        type: String,
        required: true,
        unique: true
    },
    rol: {
        type: String,
        required: true,
    },

},
    { timestamps: true }
)

const usuarioModel = mongoose.model('Usuario', usuarioSchema);

export default usuarioModel