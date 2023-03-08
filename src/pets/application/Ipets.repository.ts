
import Message from "../../context/responses/Message";
import Pet from "../domain/Pet"


export default interface IPetsRepository {

  findAll(): Promise<Pet[]>;
  findById(id: Number): Promise<Pet>;
  save(pet: Pet): Promise<Pet>;
}
