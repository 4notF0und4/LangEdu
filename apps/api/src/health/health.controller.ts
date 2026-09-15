import { Controller, Get, Header, ServiceUnavailableException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import type { HealthResponse } from '@langedu/contracts';

@Controller('health')
export class HealthController {
  constructor(private readonly database: DatabaseService) {}

  @Get('ready')
  @Header('Cache-Control', 'no-store')
  async getReadiness() {
    try {
      await this.database.query('SELECT 1 FROM lessons LIMIT 1');
      return { status: 'ok', database: 'ok' };
    } catch {
      throw new ServiceUnavailableException('Məlumat bazası hazır deyil.');
    }
  }

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
