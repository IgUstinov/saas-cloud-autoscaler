import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NewService } from './new/new.service';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [NewService],
})
export class AppModule {}
