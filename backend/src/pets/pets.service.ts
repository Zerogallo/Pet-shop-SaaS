import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './pets.entity';
import { MedicalRecord } from './medical-record.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
    @InjectRepository(MedicalRecord)
    private recordRepository: Repository<MedicalRecord>,
  ) {}

  async create(petData: Partial<Pet>): Promise<Pet> {
    const pet = this.petRepository.create(petData);
    return this.petRepository.save(pet);
  }

  async findAll(): Promise<Pet[]> {
    return this.petRepository.find({ relations: ['medicalRecords'] });
  }

  async findOne(id: number): Promise<Pet | null> {
    return this.petRepository.findOne({ where: { id }, relations: ['medicalRecords'] });
  }

  async addMedicalRecord(petId: number, recordData: Partial<MedicalRecord>): Promise<MedicalRecord> {
    const pet = await this.findOne(petId);
    if (!pet) throw new Error('Pet não encontrado');
    const record = this.recordRepository.create({ ...recordData, pet });
    return this.recordRepository.save(record);
  }
}