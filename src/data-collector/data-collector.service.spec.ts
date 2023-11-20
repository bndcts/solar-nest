import { Test, TestingModule } from '@nestjs/testing';
import { DataCollectorService } from './data-collector.service';
import { setupTestDatabase } from './database-helpers';
import axios from 'axios';

describe('DataCollectorService', () => {
  let service: DataCollectorService;
  let db;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataCollectorService],
    }).compile();
    service = module.get<DataCollectorService>(DataCollectorService);
  });



  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetchDataFromAPI', () => {
    it('should return non empty json', async () => {
      const mockData = { data: 'mockData' };
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(mockData));
      expect(await service.fetchDataFromAPI()).toBe(mockData.data);
    });
  });

  describe('splitData', () => {
    // Test implementation goes here
  });

});
