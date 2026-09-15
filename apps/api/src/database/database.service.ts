import { Injectable, Logger, type OnModuleDestroy, type OnModuleInit } from '@nestjs/common';
import { Pool, type QueryResultRow } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly pool: Pool;
  private readonly logger = new Logger(DatabaseService.name);

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL təyin edilməyib. apps/api/.env faylını hazırla.');
    }
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 5,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 5000,
      statement_timeout: 10000,
    });
    this.pool.on('error', () => this.logger.error('PostgreSQL bağlantısı kəsildi.'));
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.pool.query('SELECT 1 FROM lessons LIMIT 1');
    } catch {
      await this.pool.end();
      throw new Error('PostgreSQL hazır deyil. DATABASE_URL, baza xidməti və npm.cmd run db:migrate əmrini yoxla.');
    }
  }

  query<T extends QueryResultRow>(sql: string, values: unknown[] = []) {
    return this.pool.query<T>(sql, values);
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }
}
