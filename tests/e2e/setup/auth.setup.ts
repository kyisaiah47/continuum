import { test as setup } from '@playwright/test'

/**
 * Note: This setup file is for future authentication setup.
 * Currently, tests run without authentication to test the public flows
 * and authentication redirects.
 *
 * To add authenticated tests:
 * 1. Create a test user in Supabase
 * 2. Use Supabase Auth API to get session
 * 3. Save session to storage state
 * 4. Use storage state in tests
 */

setup('skip auth setup for now', async () => {
  // No-op for now
  // Tests will handle auth redirects
})
