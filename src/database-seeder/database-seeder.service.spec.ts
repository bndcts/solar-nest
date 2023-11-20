import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseSeederService } from './database-seeder.service';
import { User } from '../users/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


describe('DatabaseSeederService', () => {
  let service: DatabaseSeederService;
  let userRepositoryToken: string | Function = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseSeederService,
      { provide: userRepositoryToken, useClass: Repository }],
    }).compile();

    service = module.get<DatabaseSeederService>(DatabaseSeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
