import Message from "../../context/responses/Message";
import Pet from "../domain/Pet";
import IPetsRepository from "../domain/Ipets.repository";


export default class PetsUseCases {
  
  IpetsRepository: IPetsRepository;

  constructor(petsRepository: IPetsRepository) {
    this.IpetsRepository = petsRepository;
  }


  async findAll(): Promise<Pet[]> {
    return await this.IpetsRepository.findAll();
  }
  async save(pet: Pet): Promise<Pet> {
    return await this.IpetsRepository.save(pet);
  }
}
