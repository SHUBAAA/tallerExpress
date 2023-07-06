import mongoose from 'mongoose';
import bcrypt from "bcrypt";

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
        select: false
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

usuarioModel.create({ _id: "64a634bef6928f6274d30499", nombre: "Manolo", email: "Manolo@gmail.com", contrasena: bcrypt.hashSync("hola", 10), rut: "11410062-5", rol: "ADMIN" }).catch((error) => {
    if (error.code === 11000) {
        console.error("Error de clave duplicada");
    } else {
        console.error(error);
    }
});

export default usuarioModel