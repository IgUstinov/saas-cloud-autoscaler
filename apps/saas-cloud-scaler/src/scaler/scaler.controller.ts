import { Controller, Get, Param } from '@nestjs/common';
import { ScalerService } from './scaler.service';

@Controller('scaler')
export class ScalerController {
  constructor(private readonly autoScalerService: ScalerService) {}

  @Get('old/:serviceName')
  async scaleServiceOld(@Param('serviceName') serviceName: string) {
    return await this.autoScalerService.scaleService(serviceName);
  }

  @Get(':serviceName')
  scaleService(@Param('serviceName') serviceName: string) {
    return this.autoScalerService.checkLoadAndScale(serviceName);
  }
}
