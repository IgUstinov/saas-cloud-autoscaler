import { Module } from '@nestjs/common';
import { HttpService } from './http.service';
import { AuthLibModule, AuthService } from './auth';

@Module({
  providers: [HttpService, AuthService],
  exports: [HttpService],
  imports: [AuthLibModule],
})
export class HttpModule {}
