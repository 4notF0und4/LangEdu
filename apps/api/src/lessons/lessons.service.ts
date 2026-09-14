import { Injectable, NotFoundException } from '@nestjs/common';
import type { Lesson } from '@langedu/contracts';
import { lessons } from './lessons.data.js';

@Injectable()
export class LessonsService {
  findBySlug(slug: string): Lesson {
    const lesson = lessons.find((item) => item.slug === slug);
    if (!lesson) throw new NotFoundException('Dərs tapılmadı');
    return lesson;
  }
}
