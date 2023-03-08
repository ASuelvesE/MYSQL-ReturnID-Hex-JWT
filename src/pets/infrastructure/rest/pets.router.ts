import express, { Request, Response } from "express";
const router = express.Router();

//usescases
import IPetsRepository from "../../application/Ipets.repository";
//repository
import PetsRepositoryMysql from "../services/pets.repository.mysql";

//domain
import Message from "../../../context/responses/Message";
import { isAuth } from "../../../context/token/auth";
import Pet from "../../domain/Pet";


//implementation
const IpetsRepository: IPetsRepository = new PetsRepositoryMysql();

router.get("/", async (req: Request, res: Response) => {
  try {
    const pets: Pet[] = await IpetsRepository.findAll();
    res.send(pets);
  } catch (error) {
    const message: Message = {
      text: String(error),
    };
    res.status(500).send(message);
  }
});
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const pet: Pet = await IpetsRepository.findById(Number(req.params.id))
    res.send(pet);
  } catch (error) {
    const message: Message = {
      text: String(error),
    };
    res.status(500).send(message);
  }
});
router.post("/", async (req: Request, res: Response) => {
  try {
    const newPet: Pet = await IpetsRepository.save(req.body);
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
