import { Test, TestingModule } from '@nestjs/testing';
import { ScalerController } from './scaler.controller';

describe('ScalerController', () => {
  let controller: ScalerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScalerController],
    }).compile();

    controller = module.get<ScalerController>(ScalerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
