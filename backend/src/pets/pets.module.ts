import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { Pet } from './pets.entity';
import { MedicalRecord } from './medical-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pet, MedicalRecord])],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}