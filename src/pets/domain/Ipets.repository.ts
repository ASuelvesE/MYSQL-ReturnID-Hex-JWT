
import Message from "../../context/responses/Message";
import Pet from "./Pet";


export default interface IPetsRepository {

  findAll(): Promise<Pet[]>;
  save(pet: Pet): Promise<Pet>;
}
