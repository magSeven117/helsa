import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.specialty.createMany({
    data: specialties,
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

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
