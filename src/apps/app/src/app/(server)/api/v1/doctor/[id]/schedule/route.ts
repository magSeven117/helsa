import { HttpNextResponse } from '@helsa/api/http-next-response';
import { routeHandler } from '@helsa/api/route-handler';
import { database } from '@helsa/database';
import { CreateSchedule } from '@helsa/engine/doctor/application/services/create-schedule';
import { GetDoctorSchedule } from '@helsa/engine/doctor/application/services/get-doctor-schedule';
import { DoctorNotFoundError } from '@helsa/engine/doctor/domain/errors/doctor-not-found-error';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { InngestEventBus } from '@helsa/events/event-bus';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  days: z.array(
    z.object({
      day: z.string(),
      hours: z.array(z.object({ hour: z.string() })),
    }),
  ),
  duration: z.number().optional(),
  maxAppointment: z.number().optional(),
});

export const POST = routeHandler(
  { name: 'create-schedule', schema },
  async ({ params, body }) => {
    try {
      console.log('POST /api/v1/doctor/[id]/schedule - Iniciando...');
      const { id } = params;
      const { days, duration, maxAppointment } = body;
      
      console.log('Datos recibidos:', { id, days, duration, maxAppointment });
      
      const service = new CreateSchedule(new PrismaDoctorRepository(database), new InngestEventBus());
      console.log('Servicio creado, ejecutando...');
      
      await service.run(id, days, duration, maxAppointment);
      console.log('Schedule guardado exitosamente en la base de datos');

      const response = NextResponse.json({ 
        success: true, 
        message: 'Schedule created successfully',
        data: { days, duration, maxAppointment }
      }, { status: 201 });
      
      console.log('Respuesta creada exitosamente');
      return response;
    } catch (error) {
      console.error('Error detallado en POST /api/v1/doctor/[id]/schedule:', error);
      console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
      throw error; // Re-lanzar el error para que sea manejado por el routeHandler
    }
  },
  (error) => {
    console.error('Error manejado por routeHandler:', error);
    console.error('Tipo de error:', error?.constructor?.name);
    console.error('Mensaje de error:', error instanceof Error ? error.message : 'No message');
    
    switch (true) {
      case error instanceof DoctorNotFoundError:
        console.log('Error: Doctor no encontrado');
        return HttpNextResponse.domainError(error, 404);
      default:
        console.log('Error: Error interno del servidor');
        return HttpNextResponse.internalServerError(error instanceof Error ? error : undefined);
    }
  },
);

export const GET = routeHandler({ name: 'get-doctor-schedule' }, async ({ params }) => {
  const { id } = params;
  const service = new GetDoctorSchedule(new PrismaDoctorRepository(database));
  const schedule = await service.run(id);
  return HttpNextResponse.json({ data: schedule });
});
