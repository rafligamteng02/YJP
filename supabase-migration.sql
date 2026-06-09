-- Create tables for PT YUSANO JAYA PRATAMA

CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  icon TEXT NOT NULL DEFAULT 'pipe',
  name JSONB NOT NULL DEFAULT '{"id":"","en":""}',
  category JSONB NOT NULL DEFAULT '{"id":"","en":""}',
  description JSONB NOT NULL DEFAULT '{"id":"","en":""}',
  features JSONB NOT NULL DEFAULT '[]',
  specs JSONB NOT NULL DEFAULT '[]',
  image TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL DEFAULT '',
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS categories (
  id BIGSERIAL PRIMARY KEY,
  "nameId" TEXT NOT NULL,
  "nameEn" TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Allow anon access (since this is a public-facing app)
CREATE POLICY "Allow anon read products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow anon insert products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update products" ON products FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete products" ON products FOR DELETE USING (true);

CREATE POLICY "Allow anon read messages" ON messages FOR SELECT USING (true);
CREATE POLICY "Allow anon insert messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update messages" ON messages FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete messages" ON messages FOR DELETE USING (true);

CREATE POLICY "Allow anon read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow anon insert categories" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update categories" ON categories FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete categories" ON categories FOR DELETE USING (true);
