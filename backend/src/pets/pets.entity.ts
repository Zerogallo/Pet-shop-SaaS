import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appointment } from '../appointments/appointment.entity';
import { MedicalRecord } from './medical-record.entity';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  species: string; // cão, gato

  @Column()
  breed: string;

  @Column()
  birthDate: string;

  @Column({ nullable: true })
  weight: number;

  @Column({ nullable: true })
  ownerName: string;

  @OneToMany(() => Appointment, apt => apt.pet)
  appointments: Appointment[];

  @OneToMany(() => MedicalRecord, record => record.pet)
  medicalRecords: MedicalRecord[];
}