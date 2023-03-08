
import Message from "../../../context/responses/Message";
import { executeQuery } from "../../../context/db/mysql.connector";
import Pet from "../../domain/Pet";
import IPetsRepository from "../../application/Ipets.repository";



export default class PetsRepositoryMysql implements IPetsRepository {

  async findAll(): Promise<Pet[]> {
    const pets: Pet[] = [];
    const sql: string = `select * FROM animales`
    try {
      const petsDB: any[] = await executeQuery<Pet[]>(sql);
      for (let petDB of petsDB) {
        const newPet: Pet = {
          id: petDB.id,
          dni: petDB.DNI,
          chip: petDB.chip,
          nombre: petDB.nombre,
          genero: petDB.genero,
          color: petDB.color,
          fechaNacimiento: new Date(petDB.fechaNacimiento)
        };
        pets.push(newPet);
      }
      return pets;
    } catch (error) {
      //console.error(error);
      return [];
    }
  }
  async findById(id: Number): Promise<Pet> {
    const sql: string = `select * FROM animales WHERE id = ${id}`
    try {
      const petsDB: any[] = await executeQuery<Pet[]>(sql);
      const pet: Pet = {
        id: petsDB[0].id,
        dni: petsDB[0].DNI,
        chip: petsDB[0].chip,
        nombre: petsDB[0].nombre,
        genero: petsDB[0].genero,
        color: petsDB[0].color,
        fechaNacimiento: new Date(petsDB[0].fechaNacimiento)
      };
      return pet;
    } catch (error) {
      //console.error(error);
      const pet: Pet = {
        dni: "",
        chip: "",
        nombre: "",
        genero: "",
        color: "",
        fechaNacimiento: new Date()
      };
      return pet;
    }
  }
  async save(pet: Pet): Promise<Pet> {
    const sql: string = `insert into animales (DNI,chip,nombre,genero,color,fechaNacimiento) values ('${pet.dni}','${pet.chip}','${pet.nombre}','${pet.genero}','${pet.color}','${pet.fechaNacimiento}')`
    try {
      const res: any = await executeQuery<Pet[]>(sql);
      if(res){
        pet.id = res.insertId;
      }
      return pet;
    } catch (error) {
      //console.error(error);
      return pet;
    };
  }
}
