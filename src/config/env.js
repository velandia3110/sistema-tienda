import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  DATABASE_URL: process.env.DATABASE_URL,
};

if (!env.DATABASE_URL) {
  console.error('CRITICAL ERROR: DATABASE_URL is not defined in the environment.');
  process.exit(1);
}
