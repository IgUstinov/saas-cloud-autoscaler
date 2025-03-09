import { Module } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { GatewayController } from './gateway.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ProxyService],
  controllers: [GatewayController],
})
export class GatewayModule {}
