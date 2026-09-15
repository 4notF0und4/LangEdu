import { Controller, Get, Param } from '@nestjs/common';
import type { Lesson } from '@langedu/contracts';
import { LessonsService } from './lessons.service.js';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get(':slug')
  getLesson(@Param('slug') slug: string): Promise<Lesson> {
    return this.lessonsService.findBySlug(slug);
  }
}
