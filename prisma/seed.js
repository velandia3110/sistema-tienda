import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categorias = [
    { nombre: 'Papelería', impuesto: 0.07 },
    { nombre: 'Droguería', impuesto: 0.03 },
    { nombre: 'Supermercado', impuesto: 0.00 },
    { nombre: 'Aseo', impuesto: 0.05 },
  ];

  for (const cat of categorias) {
    await prisma.categoria.upsert({
      where: { nombre: cat.nombre },
      update: { impuesto: cat.impuesto },
      create: { nombre: cat.nombre, impuesto: cat.impuesto },
    });
  }

  console.log('Seed: Categorías fijas creadas/actualizadas con éxito.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
