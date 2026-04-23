import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  async create(appointmentData: Partial<Appointment>): Promise<Appointment> {
    const apt = this.appointmentRepository.create(appointmentData);
    return this.appointmentRepository.save(apt);
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find({ relations: ['pet', 'employee'] });
  }

  async updateStatus(id: number, status: string): Promise<void> {
    await this.appointmentRepository.update(id, { status });
  }
}