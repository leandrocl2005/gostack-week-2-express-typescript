import { v4 as uuidV4 } from 'uuid';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getYear, getMonth, isEqual, getDate } from 'date-fns';


import Appointment from '../../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDto';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findAllInMonthFromProvider(
    {provider_id, month, year}: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {

    const appointmentsInDate = this.appointments.filter(appointment => {
      return appointment.provider_id == provider_id &&
      getMonth(appointment.date) + 1 === month &&
      getYear(appointment.date) === year
    });

    return appointmentsInDate;
  }

  public async findAllInDayFromProvider(
    {provider_id, month, year, day}: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {

    const appointmentsInDate = this.appointments.filter(appointment => {
      return appointment.provider_id == provider_id &&
      getMonth(appointment.date) + 1 === month &&
      getYear(appointment.date) === year &&
      getDate(appointment.date) === day
    });

    return appointmentsInDate;
  }


  public async findByDate(date: Date): Promise<Appointment | undefined> {

    const findAppointment = this.appointments.find(
      appointment => isEqual(appointment.date, date)
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    user_id,
    date
  }: ICreateAppointmentDTO): Promise<Appointment> {

    const appointment = new Appointment();

    Object.assign(appointment, { id: uuidV4(), date, provider_id, user_id })

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
