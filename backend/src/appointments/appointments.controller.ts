import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('appointments')
@UseGuards(AuthGuard('jwt'))
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) {}

  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.appointmentsService.create(body);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: number, @Body('status') status: string) {
    return this.appointmentsService.updateStatus(id, status);
  }
}