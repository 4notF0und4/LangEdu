import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module.js';
import { LessonsModule } from './lessons/lessons.module.js';

@Module({ imports: [HealthModule, LessonsModule] })
export class AppModule {}
