import { Controller, Get, Header } from '@nestjs/common';
import type { HealthResponse } from '@langedu/contracts';

@Controller('health')
export class HealthController {
  @Get()
  @Header('Cache-Control', 'no-store')
  getHealth(): HealthResponse {
    return {
      status: 'ok',
      service: 'langedu-api',
      timestamp: new Date().toISOString(),
    };
  }
}
