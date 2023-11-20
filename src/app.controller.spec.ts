import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users/user.entity';
import { UsersService } from './users/users.service';

describe('AppController', () => {
  let appController: AppController;
  let userRepositoryToken: string | Function = getRepositoryToken(User);

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService, UsersService,
      { provide: userRepositoryToken, useClass: Repository }],
      controllers: [AppController],
      imports: [AuthModule]
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
