import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller.js';
import { LessonsService } from './lessons.service.js';
import { DatabaseModule } from '../database/database.module.js';

@Module({ imports: [DatabaseModule], controllers: [LessonsController], providers: [LessonsService] })
export class LessonsModule {}
