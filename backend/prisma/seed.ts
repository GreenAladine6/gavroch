// prisma/seed.ts
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash(
    process.env.ADMIN_PASSWORD ?? 'Admin1234!',
    10,
  );

  await prisma.user.upsert({
    where: { email: 'admin@gavroch.com' },
    update: {},
    create: {
      email: 'admin@gavroch.com',
      password,
      firstName: 'Admin',
      lastName: 'Gavroch',
      role: 'ADMIN',
    },
  });

  console.log('Admin ready');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());