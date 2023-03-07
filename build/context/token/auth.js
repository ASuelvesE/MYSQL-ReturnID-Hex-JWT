"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = "mySecretKey";
const createToken = (pet) => {
    const payload = {
        pet: {
            id: pet.id,
            dni: pet.dni,
        },
    };
    return jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: "1 days" });
};
exports.createToken = createToken;
const isAuth = (req, response, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
            //console.log(decoded);
            req.body.auth = decoded.pet;
            next();
        }
    }
    catch (err) {
        console.error(err);
        const message = {
            text: "No autorizado",
        };
        response.status(401).json(message);
    }
};
exports.isAuth = isAuth;
