CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  type TEXT DEFAULT 'text',
  file_key TEXT,
  file_name TEXT,
  file_size INTEGER,
  mime_type TEXT,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
