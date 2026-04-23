import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pet } from './pets.entity';

@Entity()
export class MedicalRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  description: string; // sintomas, diagnóstico

  @Column({ nullable: true })
  prescription: string;

  @Column({ nullable: true })
  veterinarian: string;

  @ManyToOne(() => Pet, pet => pet.medicalRecords)
  pet: Pet;
}