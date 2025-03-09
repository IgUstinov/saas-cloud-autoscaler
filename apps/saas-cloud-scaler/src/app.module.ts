import { Module } from '@nestjs/common';
import { ScalerModule } from './scaler/scaler.module';

@Module({
  imports: [ScalerModule],
})
export class AppModule {}
