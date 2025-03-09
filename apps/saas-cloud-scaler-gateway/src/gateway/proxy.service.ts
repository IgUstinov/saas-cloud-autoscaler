import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProxyService {
  constructor(private readonly httpService: HttpService) {}

  async forwardRequest(method: string, url: string, data?: object) {
    try {
      const response = await firstValueFrom(this.httpService.request({ method, url, data }));
      return response.data as object;
    } catch (error) {
      const { message } = error as { message: string };
      throw new Error(`Gateway Error: ${message}`);
    }
  }
}
