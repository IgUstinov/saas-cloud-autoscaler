import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class UserService implements OnModuleInit {
  private readonly logger = new Logger(UserService.name);
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(dto: CreateUserDto) {
    try {
      //const hashedPassword = await bcrypt.hash(dto.password, 10);
      const password = dto.password;
      const user = this.repo.create({
        email: dto.email,

        password: password,
      });
      return this.repo.save(user);
    } catch (error) {
      this.logger.error((error as Error).message);
    }
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  onModuleInit() {
    this.logger.log('User service is listening for Kafka events...');
  }

  @MessagePattern('user.created')
  async handleUserCreated(@Payload() data: { email: string; password: string }) {
    this.logger.log('New user from Kafka:', data);
    const user = this.repo.create({
      email: data.email,
      password: data.password,
    });
    await this.repo.save(user);
  }
}
