import { Test, TestingModule } from '@nestjs/testing';
import { ScalerService } from './scaler.service';

describe('ScalerService', () => {
  let service: ScalerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScalerService],
    }).compile();

    service = module.get<ScalerService>(ScalerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
