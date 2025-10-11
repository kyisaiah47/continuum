-- Add password column to ownbase_users table
ALTER TABLE ownbase_users ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- Create index for email lookups (used during login)
CREATE INDEX IF NOT EXISTS idx_ownbase_users_email ON ownbase_users(email);

-- Update demo user with a hashed password (password: demo123456)
-- This is a bcrypt hash of 'demo123456' with salt rounds 10
UPDATE ownbase_users 
SET password_hash = '$2b$10$rZ5F5xKXN4YPqjGJ1K9HCOzQJ5vX9Y8nL7tW6kM3pR2qS4tU5vW6e'
WHERE email = 'demo@continuum.app';
