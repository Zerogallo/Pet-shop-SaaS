import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PetsService } from './pets.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('pets')
@UseGuards(AuthGuard('jwt'))
export class PetsController {
  constructor(private petsService: PetsService) {}

  @Get()
  findAll() {
    return this.petsService.findAll();
  }

  @Post()
  create(@Body() body: Partial<any>) {
    return this.petsService.create(body);
  }

  @Get(':id/medical-records')
  getMedicalRecords(@Param('id') id: number) {
    return this.petsService.findOne(id).then(pet => pet?.medicalRecords || []);
  }

  @Post(':id/medical-records')
  addMedicalRecord(@Param('id') id: number, @Body() body: Partial<any>) {
    return this.petsService.addMedicalRecord(id, body);
  }
}