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
            email: "john@doe.com",
            firstName: 'John',
            lastName: 'Doe',
            isActive: true,
            password: '123456'
        },
        {
            email: "jane@doe.com",
            firstName: 'Jane',
            lastName: 'Doe',
            isActive: false,
            password: '123456'
        }
    ];

    await this.userRepository.save(dummyData);
  }
}
