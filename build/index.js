"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger/swagger-output.json');
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
const allowedOrigins = ["*"];
const options = {
    origin: allowedOrigins,
};
app.use((0, cors_1.default)(options));
//routers
const pets_router_1 = require("./pets/infrastructure/rest/pets.router");
app.use("/pets", pets_router_1.routerPets);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.listen(process.env.PORT, () => {
    console.log(`Application started on port ${port}`);
});
