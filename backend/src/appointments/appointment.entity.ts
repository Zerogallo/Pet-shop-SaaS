import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pet } from '../pets/pets.entity';
import { User } from '../users/user.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string; // ISO string

  @Column()
  time: string; // "14:00"

  @Column()
  service: string; // banho, tosa, consulta

  @Column({ default: 'pending' })
  status: string;

  @ManyToOne(() => Pet, pet => pet.appointments)
  pet: Pet;

  @ManyToOne(() => User)
  employee: User;
}