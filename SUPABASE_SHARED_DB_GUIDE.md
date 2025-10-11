# Supabase Shared Database Guide

**CRITICAL:** We're using a **shared Supabase database**. This means you CANNOT use `psql` or direct database connections. You MUST use Supabase CLI or the Dashboard.

---

## ⚠️ What DOESN'T Work (DON'T DO THIS)

```bash
# ❌ NEVER TRY THESE - THEY WILL FAIL
psql -h aws-0-us-west-1.pooler.supabase.com ...
PGPASSWORD='xxx' psql ...
pg_dump ...
pg_restore ...
```

**Error you'll get:** `FATAL: Tenant or user not found`

**Why?** Supabase shared databases block external psql connections for security.

---

## ✅ What DOES Work (DO THIS)

### 1. **Making Database Changes**

#### Option A: Supabase CLI (Preferred for migrations)
```bash
# Create a migration file
# IMPORTANT: File name must be: <timestamp>_description.sql
# Example: 20251010000001_add_users_table.sql

# Create the file
cat > supabase/migrations/20251010000001_add_users_table.sql << 'EOF'
CREATE TABLE ownbase_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
EOF

# Push to Supabase (this runs the migration)
supabase db push

# If prompted, type 'y' to confirm
# Or use: echo "y" | supabase db push
```

#### Option B: Supabase Dashboard SQL Editor (For one-off queries)
1. Go to: https://supabase.com/dashboard/project/uvcstcajctqbxddosdbf/sql/new
2. Paste your SQL
3. Click "RUN"

---

## 🔧 Common Migration Tasks

### Creating a New Migration

```bash
# 1. Create migration file with timestamp format
# Pattern: YYYYMMDDHHMMSS_description.sql
cat > supabase/migrations/$(date +%Y%m%d%H%M%S)_my_change.sql << 'EOF'
-- Your SQL here
ALTER TABLE ownbase_contacts ADD COLUMN phone TEXT;
EOF

# 2. Push it
echo "y" | supabase db push
```

### When Migration Fails: "Table Already Exists"

This happens when tables exist but Supabase doesn't know the migration was applied.

```bash
# Mark the migration as already applied (don't run it again)
supabase migration repair --status applied 20251010000001

# Then push remaining migrations
echo "y" | supabase db push
```

### When You Need to Re-run a Migration

```bash
# Mark migration as NOT applied (will run again)
supabase migration repair --status reverted 20251010000001

# Push it again
echo "y" | supabase db push
```

### Check Migration Status

```bash
# See which migrations are applied locally vs remote
supabase migration list

# Output shows:
# Local          | Remote         | Time (UTC)
# 20251010000001 | 20251010000001 | 2025-10-10 00:00:01  ← Applied
# 20251010000002 |                | 2025-10-10 00:00:02  ← Not applied yet
```

---

## 📋 Step-by-Step Workflow

### Initial Setup (First Time Only)
```bash
# 1. Link to Supabase project
supabase link --project-ref uvcstcajctqbxddosdbf

# 2. Check connection
supabase db push --dry-run
```

### Adding a New Table
```bash
# 1. Create migration file
cat > supabase/migrations/20251010120000_create_activities.sql << 'EOF'
CREATE TABLE ownbase_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES ownbase_users(id),
  contact_id UUID REFERENCES ownbase_contacts(id),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index
CREATE INDEX idx_activities_contact ON ownbase_activities(contact_id);
EOF

# 2. Push to database
echo "y" | supabase db push

# 3. Verify (optional)
supabase migration list
```

### Modifying Existing Table
```bash
# 1. Create migration
cat > supabase/migrations/20251010120001_add_columns.sql << 'EOF'
ALTER TABLE ownbase_contacts
ADD COLUMN IF NOT EXISTS website TEXT,
ADD COLUMN IF NOT EXISTS timezone TEXT DEFAULT 'America/Los_Angeles';
EOF

# 2. Push
echo "y" | supabase db push
```

### Seed Data
```bash
# 1. Create seed migration
cat > supabase/migrations/20251010120002_seed_data.sql << 'EOF'
DO $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Get demo user
  SELECT id INTO v_user_id FROM ownbase_users WHERE email = 'demo@continuum.app';

  IF v_user_id IS NULL THEN
    RAISE NOTICE 'No user found';
    RETURN;
  END IF;

  -- Insert seed data
  INSERT INTO ownbase_contacts (user_id, name, email, company)
  VALUES
    (v_user_id, 'Alice Johnson', 'alice@example.com', 'TechCorp'),
    (v_user_id, 'Bob Smith', 'bob@startup.io', 'StartupHub');
END $$;
EOF

# 2. Push
echo "y" | supabase db push
```

---

## 🛠️ Troubleshooting

### Error: "Tenant or user not found"
**Cause:** You tried to use `psql` directly
**Solution:** Use `supabase db push` instead

### Error: "relation already exists"
**Cause:** Table exists but migration not marked as applied
**Solution:**
```bash
supabase migration repair --status applied <migration_version>
echo "y" | supabase db push
```

### Error: "duplicate key value violates unique constraint"
**Cause:** Migration already marked as applied in schema_migrations table
**Solution:**
```bash
# Check migration status first
supabase migration list

# If it shows as applied remotely, don't push it again
# If you need to re-run it:
supabase migration repair --status reverted <migration_version>
echo "y" | supabase db push
```

### Error: "Remote migration versions not found"
**Cause:** Local migrations don't match remote history
**Solution:**
```bash
# Mark all old migrations as applied
supabase migration repair --status applied 20251009000001 20251009000002 20251009000003

# Then push new ones
echo "y" | supabase db push
```

### Error: "read tcp ... operation timed out"
**Cause:** Supabase connection pooler is having issues
**Solution:**
```bash
# Use Supabase Dashboard SQL Editor instead:
# https://supabase.com/dashboard/project/uvcstcajctqbxddosdbf/sql/new

# Or wait a few minutes and try again
```

### Can't see my changes in the app
**Cause:** Migration ran but app is caching old schema
**Solution:**
```bash
# Restart dev server
# Kill it (Ctrl+C) and restart:
npm run dev

# Or if running in background:
pkill -f "next dev"
npm run dev
```

---

## 🔐 Our Database Info

**Project Ref:** `uvcstcajctqbxddosdbf`
**Database:** `postgres`
**Schema:** `public`
**Table Prefix:** `ownbase_*`

### Connection Strings (For App Code Only)
```bash
# Supabase URL (from .env.local)
NEXT_PUBLIC_SUPABASE_URL=https://uvcstcajctqbxddosdbf.supabase.co

# Supabase Anon Key (from .env.local)
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-key>
```

**Note:** These are for app code (`createClient()`) ONLY. Not for CLI.

---

## 📝 Migration File Naming Rules

✅ **Correct:**
- `20251010120000_add_users.sql`
- `20251009193421_initial_schema.sql`
- `2025_10_10_000001_my_change.sql`

❌ **Incorrect:**
- `add_users.sql` (no timestamp)
- `RUN_THIS_FIRST.sql` (doesn't match pattern)
- `20251010_add_users.txt` (wrong extension)
- `migration_001.sql` (wrong format)

**Pattern:** `<timestamp>_<description>.sql`

---

## 🎯 Quick Reference

| Task | Command |
|------|---------|
| Create migration | `cat > supabase/migrations/$(date +%Y%m%d%H%M%S)_my_change.sql` |
| Push migration | `echo "y" \| supabase db push` |
| Check status | `supabase migration list` |
| Mark as applied | `supabase migration repair --status applied <version>` |
| Mark as NOT applied | `supabase migration repair --status reverted <version>` |
| Run SQL manually | Use Supabase Dashboard SQL Editor |

---

## 🚨 Critical Rules

1. **NEVER use psql directly** - Always use Supabase CLI
2. **ALWAYS use timestamp format** for migration files
3. **ALWAYS prefix tables** with `ownbase_` (shared database)
4. **ALWAYS check migration status** with `supabase migration list` before pushing
5. **ALWAYS mark old migrations as applied** if they already ran manually

---

## 💡 Pro Tips

### Automatically answer 'yes' to prompts
```bash
echo "y" | supabase db push
```

### Create migration with current timestamp
```bash
cat > supabase/migrations/$(date +%Y%m%d%H%M%S)_my_change.sql << 'EOF'
-- Your SQL here
EOF
```

### Check what will run before pushing
```bash
supabase db push --dry-run
```

### View migration file content
```bash
cat supabase/migrations/20251010000001_my_migration.sql
```

### Mark multiple migrations as applied
```bash
supabase migration repair --status applied 20251010000001 20251010000002 20251010000003
```

---

## 🔄 Complete Example: Adding a Feature

Let's say we want to add a "notes" feature:

```bash
# 1. Create the migration
cat > supabase/migrations/$(date +%Y%m%d%H%M%S)_add_notes.sql << 'EOF'
-- Create notes table
CREATE TABLE ownbase_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES ownbase_users(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES ownbase_contacts(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_notes_user ON ownbase_notes(user_id);
CREATE INDEX idx_notes_contact ON ownbase_notes(contact_id);
EOF

# 2. Check the migration file was created
ls -la supabase/migrations/

# 3. Push it to Supabase
echo "y" | supabase db push

# 4. Verify it worked
supabase migration list

# Should show the migration as applied on both local and remote
```

---

## ❓ FAQ

**Q: Can I run SQL queries from command line?**
A: No. Use Supabase Dashboard SQL Editor: https://supabase.com/dashboard/project/uvcstcajctqbxddosdbf/sql/new

**Q: How do I see what's in the database?**
A: Use Supabase Dashboard Table Editor: https://supabase.com/dashboard/project/uvcstcajctqbxddosdbf/editor

**Q: Can I use pgAdmin or DBeaver?**
A: No. Shared Supabase databases don't allow external GUI connections.

**Q: What if migration fails halfway?**
A: Mark it as reverted and fix the SQL:
```bash
supabase migration repair --status reverted <version>
# Edit the .sql file to fix the error
echo "y" | supabase db push
```

**Q: How do I delete a migration?**
A: You can't easily delete. Instead, create a new migration that reverses the changes:
```bash
cat > supabase/migrations/$(date +%Y%m%d%H%M%S)_rollback_feature.sql << 'EOF'
DROP TABLE IF EXISTS ownbase_feature;
EOF
echo "y" | supabase db push
```

**Q: Why do we use `ownbase_` prefix?**
A: Because this is a shared database used by multiple apps. Each app uses its own table prefix to avoid conflicts:
- `ownbase_*` - This app (Continuum)
- `turntables_*` - TableFlow app
- Other apps may have other prefixes

---

## 🎓 Remember

- ✅ Supabase CLI is your friend
- ✅ Dashboard SQL Editor for one-off queries
- ❌ NO psql, NO direct connections
- ✅ Always use `ownbase_` prefix
- ✅ Always use timestamp format for migrations
- ✅ Mark old migrations as applied if they already ran

**When in doubt, use `supabase db push`**
