import { Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import type { Lesson } from '@langedu/contracts';
import { DatabaseService } from '../database/database.service.js';

interface LessonRow {
  slug: string;
  language: 'python';
  title: string;
  summary: string;
  code: string;
  expected_output: string;
  explanation: string;
  sections: Lesson['sections'];
}

@Injectable()
export class LessonsService {
  constructor(private readonly database: DatabaseService) {}

  async findBySlug(slug: string): Promise<Lesson> {
    let row: LessonRow | undefined;
    try {
      const result = await this.database.query<LessonRow>(`
        SELECT l.slug, l.language, l.title, l.summary,
               l.code, l.expected_output, l.explanation,
               COALESCE((
                 SELECT jsonb_agg(jsonb_build_object(
                   'heading', s.heading, 'paragraphs', s.paragraphs
                 ) ORDER BY s.position)
                 FROM lesson_sections s WHERE s.lesson_id = l.id
               ), '[]'::jsonb) AS sections
        FROM lessons l WHERE l.slug = $1
      `, [slug]);
      row = result.rows[0];
    } catch {
      throw new ServiceUnavailableException('Dərs bazası müvəqqəti əlçatan deyil. Yenidən cəhd et.');
    }
    if (!row) throw new NotFoundException('Dərs tapılmadı');
    return {
      slug: row.slug, language: row.language, title: row.title, summary: row.summary,
      sections: row.sections,
      example: { code: row.code, expectedOutput: row.expected_output, explanation: row.explanation },
    };
  }
}
