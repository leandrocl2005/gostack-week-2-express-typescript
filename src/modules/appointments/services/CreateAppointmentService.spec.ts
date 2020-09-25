import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(2020, 12, 10, 11),
      user_id: '234234',
      provider_id: '123123123'
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment).toHaveProperty('provider_id');
  });

  it('should not be able to create two appointments on the same date', async () => {
    const appointmentDate = new Date(2020, 12, 10, 11);
    await createAppointment.execute({
      date: appointmentDate,
      user_id: '234234',
      provider_id: '123123123'
    });
    expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '234234',
        provider_id: '123123123'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
