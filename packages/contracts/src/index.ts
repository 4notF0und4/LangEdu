// Bu paket yalnız ortaq tiplər üçündür; import type ilə istifadə olunur.
export interface HealthResponse {
  status: 'ok';
  service: 'langedu-api';
  timestamp: string;
}

export interface Lesson {
  slug: string;
  language: 'python';
  title: string;
  summary: string;
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
  example: {
    code: string;
    expectedOutput: string;
    explanation: string;
  };
}
