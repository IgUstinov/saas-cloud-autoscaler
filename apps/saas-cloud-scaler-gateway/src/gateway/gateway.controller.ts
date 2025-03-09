import { All, Controller, Req, Res } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { Request, Response } from 'express';

@Controller()
export class GatewayController {
  constructor(private readonly proxyService: ProxyService) {}

  @All('auth/*')
  async proxyAuth(@Req() req: Request, @Res() res: Response) {
    const url = `http://auth-service:3000${req.url.replace('/auth', '')}`;
    const body = req.body as { email: string; password: string };
    const result = await this.proxyService.forwardRequest(req.method, url, body);
    res.json(result);
  }

  @All('users/*')
  async proxyUser(@Req() req: Request, @Res() res: Response) {
    const url = `http://user-service:3001${req.url.replace('/users', '')}`;
    const body = req.body as { email: string; password: string };

    const result = await this.proxyService.forwardRequest(req.method, url, body);
    res.json(result);
  }
}
