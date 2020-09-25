import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificattionsRepository: INotificationsRepository,
  ) { }

  public async execute({
    date,
    provider_id,
    user_id
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('Date does not exists.');
    }

    if (user_id === provider_id) {
      throw new AppError('Provider and user are the same.')
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate ) > 17) {
      throw new AppError('Hour does not exists');
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked', 400);
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const dateFormat = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'")

    await this.notificattionsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${dateFormat}`
    })

    return appointment;
  }
}

export default CreateAppointmentService;
