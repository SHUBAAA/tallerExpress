import jsonwebtoken from "jsonwebtoken";
import environment from "../configs/environments.js";

const { SECRET } = environment;

export function generateToken(user) {
    const { _id, email } = user;
    console.log(SECRET)
    return jsonwebtoken.sign({ id: _id, email }, SECRET, {
        expiresIn: "15m",
    });
}

export function verifyToken(token) {
    return jsonwebtoken.verify(token, SECRET);
}