CREATE TABLE lessons (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  language text NOT NULL CHECK (language = 'python'),
  title text NOT NULL,
  summary text NOT NULL,
  code text NOT NULL,
  expected_output text NOT NULL,
  explanation text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE lesson_sections (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  lesson_id integer NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  position integer NOT NULL CHECK (position >= 0),
  heading text NOT NULL,
  paragraphs text[] NOT NULL,
  UNIQUE (lesson_id, position)
);
