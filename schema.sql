CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
