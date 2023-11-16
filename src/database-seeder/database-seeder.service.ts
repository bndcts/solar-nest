import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class DatabaseSeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seedDatabase() {
    const dummyData : User[] = [
        { 
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            isActive: true,
            password: '123456'
        },
        {
            id: 2,
            firstName: 'Jane',
            lastName: 'Doe',
            isActive: false,
            password: '123456'
        }
    ];

    await this.userRepository.save(dummyData);
  }
}
