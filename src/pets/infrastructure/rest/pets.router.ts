import express, { Request, Response } from "express";
const router = express.Router();

//usescases
import PetsUseCases from "../../application/pets.usecases";
//repository
import PetsRepositoryMysql from "../db/pets.repository.mysql";
import IPetsRepository from "../../domain/Ipets.repository";
//domain
import Message from "../../../context/responses/Message";
import { isAuth } from "../../../context/token/auth";
import Pet from "../../domain/Pet";


//implementation
const IpetsRepository: IPetsRepository = new PetsRepositoryMysql();
const petsUseCases: PetsUseCases = new PetsUseCases(IpetsRepository);


router.get("/", async (req: Request, res: Response) => {
  try {
    const pets: Pet[] = await petsUseCases.findAll();
    res.send(pets);
  } catch (error) {
    const message: Message = {
      text: String(error),
    };
    res.status(500).send(message);
  }
});
router.post("/", async (req: Request, res: Response) => {
  try {
    const newPet: Pet = await petsUseCases.save(req.body);
    if (newPet.id) {
      res.send(newPet);
    } else {
      const message: Message = {
        text: "Datos Incorrectos",
      };
      res.status(404).send(message);
    }
  } catch (error) {
    const message: Message = {
      text: String(error),
    };
    res.status(500).send(message);
  }
});

export { router as routerPets };
