import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseSeederService } from './database-seeder/database-seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const databaseSeederService = app.get(DatabaseSeederService);
  await databaseSeederService.seedDatabase();
  console.log('Database seeded')
  await app.listen(3000);
}
bootstrap();
