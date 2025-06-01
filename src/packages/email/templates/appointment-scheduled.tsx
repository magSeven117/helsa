import { Body, Container, Head, Html, Preview, Section, Text } from '@react-email/components';

interface EmailProps {
  date: string;
  time: string;
  patient: {
    name: string;
    email: string;
  };
  reason?: string;
}

export function AppointmentScheduledEmail({ date, time, patient, reason }: EmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Nueva cita agendada con {patient.name}</Preview>
      <Body style={{ backgroundColor: '#f9fafb', fontFamily: 'sans-serif' }}>
        <Container
          style={{
            margin: '40px auto',
            padding: '24px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            maxWidth: '480px',
            boxShadow: '0 2px 8px #e5e7eb',
          }}
        >
          <Section>
            <Text style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: '#111827' }}>
              Nueva cita agendada
            </Text>
            <Text style={{ fontSize: '16px', color: '#374151', marginBottom: '8px' }}>
              Se ha agendado una nueva cita con el paciente:
            </Text>
            <Text style={{ fontSize: '16px', color: '#111827', marginBottom: '4px' }}>
              <strong>Nombre:</strong> {patient.name}
            </Text>
            <Text style={{ fontSize: '16px', color: '#111827', marginBottom: '4px' }}>
              <strong>Email:</strong> {patient.email}
            </Text>
            <Text style={{ fontSize: '16px', color: '#111827', marginBottom: '4px' }}>
              <strong>Fecha:</strong> {date}
            </Text>
            <Text style={{ fontSize: '16px', color: '#111827', marginBottom: '4px' }}>
              <strong>Hora:</strong> {time}
            </Text>
            {reason && (
              <Text style={{ fontSize: '16px', color: '#111827', marginBottom: '4px' }}>
                <strong>Motivo:</strong> {reason}
              </Text>
            )}
            <Text style={{ fontSize: '14px', color: '#6b7280', marginTop: '24px' }}>
              Por favor, revisa tu agenda y confirma la disponibilidad.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
