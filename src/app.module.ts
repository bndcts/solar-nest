import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { DatabaseSeederService } from './database-seeder/database-seeder.service';
import { DataCollectorService } from './data-collector/data-collector.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [AuthModule, UsersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '../general.db',
      entities: [User],
      synchronize: true,
    }),
  ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, DatabaseSeederService, DataCollectorService]
})
export class AppModule {}
