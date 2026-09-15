import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { runDatabaseCommand } from './connection.mjs';

export async function seed(client) {
  const lessons = JSON.parse(await readFile(new URL('./seed-lessons.json', import.meta.url), 'utf8'));
  await client.query('BEGIN');
  try {
    for (const lesson of lessons) {
      const result = await client.query(`
        INSERT INTO lessons (slug, language, title, summary, code, expected_output, explanation)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (slug) DO NOTHING RETURNING id
      `, [lesson.slug, lesson.language, lesson.title, lesson.summary,
        lesson.example.code, lesson.example.expectedOutput, lesson.example.explanation]);
      // Seed təkrar işlədikdə mövcud dərsə edilən dəyişiklikləri əvəz etmir.
      if (!result.rowCount) continue;
      for (const [position, section] of lesson.sections.entries()) {
        await client.query(`INSERT INTO lesson_sections (lesson_id, position, heading, paragraphs)
          VALUES ($1, $2, $3, $4)`, [result.rows[0].id, position, section.heading, section.paragraphs]);
      }
    }
    await client.query('COMMIT');
    console.log('İlkin dərs bazada hazırdır.');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await runDatabaseCommand(seed);
}
