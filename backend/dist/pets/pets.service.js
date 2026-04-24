"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pets_entity_1 = require("./pets.entity");
const medical_record_entity_1 = require("./medical-record.entity");
let PetsService = class PetsService {
    constructor(petRepository, recordRepository) {
        this.petRepository = petRepository;
        this.recordRepository = recordRepository;
    }
    async create(petData) {
        const pet = this.petRepository.create(petData);
        return this.petRepository.save(pet);
    }
    async findAll() {
        return this.petRepository.find({ relations: ['medicalRecords'] });
    }
    async findOne(id) {
        return this.petRepository.findOne({ where: { id }, relations: ['medicalRecords'] });
    }
    async addMedicalRecord(petId, recordData) {
        const pet = await this.findOne(petId);
        if (!pet)
            throw new Error('Pet não encontrado');
        const record = this.recordRepository.create({ ...recordData, pet });
        return this.recordRepository.save(record);
    }
};
exports.PetsService = PetsService;
exports.PetsService = PetsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pets_entity_1.Pet)),
    __param(1, (0, typeorm_1.InjectRepository)(medical_record_entity_1.MedicalRecord)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PetsService);
