import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.specialty.deleteMany();
  await prisma.appointmentType.deleteMany();
  await prisma.specialty.createMany({
    data: specialties,
  });

  await prisma.appointmentType.createMany({
    data: appointmentTypes,
  });

  await prisma.symptom.createMany({
    data: symptoms,
  });
}

const specialties = [
  { name: 'Cardiología' },
  { name: 'Dermatología' },
  { name: 'Endocrinología' },
  { name: 'Gastroenterología' },
  { name: 'Geriatría' },
  { name: 'Ginecología' },
  { name: 'Hematología' },
  { name: 'Infectología' },
  { name: 'Medicina interna' },
  { name: 'Nefrología' },
  { name: 'Neumología' },
  { name: 'Neurología' },
  { name: 'Nutriología' },
  { name: 'Oftalmología' },
  { name: 'Oncología' },
  { name: 'Pediatría' },
  { name: 'Psiquiatría' },
  { name: 'Reumatología' },
  { name: 'Traumatología' },
  { name: 'Urología' },
];

const symptoms = [
  {
    name: 'Silbido en el pecho',
  },
  {
    name: 'Dolor de pecho/cuello',
  },
  {
    name: 'Quejido',
  },
  {
    name: 'Escalofríos y/o sudoración',
  },
  {
    name: 'Dolor de cabeza',
  },
  {
    name: 'Dolor de músculos o cuerpo',
  },
  {
    name: 'Molestias al tragar o falta de apetito',
  },
  {
    name: 'Mucosidad nasal',
  },
  {
    name: 'Congestión nasal',
  },
  {
    name: 'Irritabilidad',
  },
  {
    name: 'Alteración de la voz',
  },
  {
    name: 'Dificultad respiratoria',
  },
  {
    name: 'Dolor de oído',
  },
  {
    name: 'Conjuntivitis',
  },
  {
    name: 'Diarrea',
  },
  {
    name: 'Vómito',
  },
  {
    name: 'Fatiga',
  },
  {
    name: 'Compromiso de conciencia',
  },
  {
    name: 'Respiración rápida',
  },
  {
    name: 'Falta de oxígeno o cianosis',
  },
  {
    name: 'Respiración lenta o ausencia de respiración',
  },
  {
    name: 'Tos',
  },
  {
    name: 'Temperatura',
  },
];

const appointmentTypes = [
  { name: 'Consulta', color: '#FF0000' },
  { name: 'Estudio', color: '#00FF00' },
  { name: 'Procedimiento', color: '#0000FF' },
];

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
