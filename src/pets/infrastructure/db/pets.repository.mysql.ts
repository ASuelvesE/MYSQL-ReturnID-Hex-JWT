
import Message from "../../../context/responses/Message";
import { executeQuery } from "../../../context/db/mysql.connector";
import Pet from "../../domain/Pet";
import IPetsRepository from "../../domain/Ipets.repository";



export default class PetsRepositoryMysql implements IPetsRepository {


  async findAll(): Promise<Pet[]> {
    const pets: Pet[] = [];
    const sql: string = `select * FROM animales`
    try {
      const petsDB: any[] = await executeQuery<Pet[]>(sql);
      for (let petDB of petsDB) {
        const newPet: Pet = {
          id: petDB.id,
          dni: petDB.dni,
          chip: petDB.chip,
          nombre: petDB.nombre,
          genero: petDB.genero,
          color: petDB.color,
          fechaNacimiento: petDB.fechaNacimiento
        };
        pets.push(newPet);
      }
      return pets;
    } catch (error) {
      console.error(error);
      return [];
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
