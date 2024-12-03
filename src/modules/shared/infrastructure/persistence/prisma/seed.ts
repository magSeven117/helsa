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

const appointmentTypes = [
  { name: 'Consulta', duration: 60, color: '#FF0000', system: true },
  { name: 'Estudio', duration: 60, color: '#00FF00', system: true },
  { name: 'Procedimiento', duration: 60, color: '#0000FF', system: true },
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
