"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_connector_1 = require("../../../context/db/mysql.connector");
class PetsRepositoryMysql {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const pets = [];
            const sql = `select * FROM animales`;
            try {
                const petsDB = yield (0, mysql_connector_1.executeQuery)(sql);
                for (let petDB of petsDB) {
                    const newPet = {
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
            }
            catch (error) {
                console.error(error);
                return [];
            }
        });
    }
    save(pet) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `insert into animales (DNI,chip,nombre,genero,color,fechaNacimiento) values ('${pet.dni}','${pet.chip}','${pet.nombre}','${pet.genero}','${pet.color}','${pet.fechaNacimiento}')`;
            try {
                const res = yield (0, mysql_connector_1.executeQuery)(sql);
                if (res) {
                    pet.id = res.insertId;
                }
                return pet;
            }
            catch (error) {
                //console.error(error);
                return pet;
            }
            ;
        });
    }
}
exports.default = PetsRepositoryMysql;
