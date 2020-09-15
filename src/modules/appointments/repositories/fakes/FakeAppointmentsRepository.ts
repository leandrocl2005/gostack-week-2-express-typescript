import { v4 as uuidV4 } from 'uuid';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { isEqual } from 'date-fns';


import Appointment from '../../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDto';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];


  public async findByDate(date: Date): Promise<Appointment | undefined> {

    const findAppointment = this.appointments.find(
      appointment => isEqual(appointment.date, date)
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    date
  }: ICreateAppointmentDTO): Promise<Appointment> {

    const appointment = new Appointment();

    Object.assign(appointment, { id: uuidV4(), date, provider_id })

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
