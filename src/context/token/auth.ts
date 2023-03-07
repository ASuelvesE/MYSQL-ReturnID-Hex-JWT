import { NextFunction, Request, Response } from "express";

import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import Pet from "../../pets/domain/Pet";

import Message from "../responses/Message";
const SECRET_KEY: Secret = "mySecretKey";

const createToken = (pet: Pet): string => {
  const payload = {
    pet: {
      id: pet.id,
      dni: pet.dni,
    },
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1 days" });
};

const isAuth = (req: Request, response: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    const token: string | undefined = authHeader && authHeader.split(" ")[1];
    if (token) {
      const decoded: any = jwt.verify(token, SECRET_KEY);
      //console.log(decoded);
      
      req.body.auth = decoded.pet;
      next();
    }
  } catch (err) {
    console.error(err);
    const message: Message = {
      text: "No autorizado",
    };
    response.status(401).json(message);
  }
};

export { createToken, isAuth };
