import { Test, TestingModule } from '@nestjs/testing';
import { IncidentRepositoryService } from './incident-repository.service';

describe('IncidentRepositoryService', () => {
  let service: IncidentRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncidentRepositoryService],
    }).compile();

    service = module.get<IncidentRepositoryService>(IncidentRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
