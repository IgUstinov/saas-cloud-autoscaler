import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto, RegisterDto } from './dtos';
import axios from 'axios';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  //'http://user-service:3001/users'
  private USER_SERVICE_URL = 'http://localhost:3001/users';

  constructor(
    private jwtService: JwtService,
    @Inject('KAFKA_SERVICE') private kafkaClient: ClientKafka,
  ) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    await axios.post(`${this.USER_SERVICE_URL}`, {
      email: dto.email,
      password: hashedPassword,
    });
    this.kafkaClient.emit('user.created', {
      email: dto.email,
      password: hashedPassword,
    });

    return { message: 'User registered' };
  }

  async login(dto: LoginDto) {
    const { data: user } = await axios.get(`${this.USER_SERVICE_URL}/${dto.email}`);
    const compare = await bcrypt.compare(dto.password, user.password);
    if (!user || !compare) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return { access_token: token };
  }
}
