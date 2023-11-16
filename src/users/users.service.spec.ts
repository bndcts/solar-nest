import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: Repository<User>;

  let usersRepositoryToken: string | Function = getRepositoryToken(User);


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService]}).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<User>>(usersRepositoryToken);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
