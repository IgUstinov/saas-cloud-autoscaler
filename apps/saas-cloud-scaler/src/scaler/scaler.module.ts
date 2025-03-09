import { Module } from '@nestjs/common';
import { ScalerService } from './scaler.service';
import { ScalerController } from './scaler.controller';
import { PrometheusModule } from '../prometheus';

@Module({
  imports: [PrometheusModule],
  providers: [ScalerService],
  controllers: [ScalerController],
})
export class ScalerModule {}
