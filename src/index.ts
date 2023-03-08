import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger/swagger-output.json')

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());

const allowedOrigins = ["*"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));

//routers
import { routerPets } from "./pets/infrastructure/rest/pets.router";


app.use("/api/pets", routerPets);
app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(process.env.PORT, () => {
  console.log(`Application started on port ${port}`);
});
