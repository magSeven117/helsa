import { NextRequest, NextResponse } from 'next/server';
import { database } from '@helsa/database';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Actualizar el estado de la cita directamente en la base de datos
    const updatedAppointment = await database.appointment.update({
      where: { id: id },
      data: { status: 'CONFIRMED' },
      select: {
        id: true,
        status: true,
        date: true,
        patientId: true,
        doctorId: true
      }
    });
    
    return NextResponse.json({
      message: 'Appointment confirmed successfully',
      appointment: updatedAppointment,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      {
        code: 'ConfirmError',
        message: error instanceof Error ? error.message : 'Unknown error',
        error: error instanceof Error ? error.name : 'Unknown',
        stack: error instanceof Error ? error.stack : undefined,
        details: {
          id: params?.id,
          timestamp: new Date().toISOString()
        }
      },
      { status: 500 }
    );
  }
}