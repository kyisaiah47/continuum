# Testing Guide - Continuum Platform

## Quick Start

```bash
# Install dependencies (if not done)
npm install

# Run tests in UI mode (recommended)
npm run test:e2e:ui

# Run tests headless
npm run test:e2e

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Debug a specific test
npm run test:e2e:debug tests/e2e/auth.spec.ts
```

## Test Structure

```
tests/
├── e2e/
│   ├── auth.spec.ts                  # Authentication tests
│   ├── ethos-crm.spec.ts             # Ethos CRM tests
│   ├── myn-customer.spec.ts          # Myn portal tests
│   ├── continuum-blockchain.spec.ts  # Continuum tests
│   ├── product-switcher.spec.ts      # Product switching tests
│   ├── navigation.spec.ts            # Navigation tests
│   ├── ui-components.spec.ts         # UI component tests
│   ├── public-pages.spec.ts          # Public page tests
│   ├── helpers.ts                    # Test utilities
│   └── setup/
│       └── auth.setup.ts             # Auth setup (future)
├── README.md                         # Test documentation
└── TEST_REPORT.md                    # Detailed test report
```

## What's Tested

### ✅ Authentication & Authorization
- Login flows with validation
- Signup with email verification
- Password reset complete flow
- Auth redirects for protected pages
- Session management

### ✅ Ethos CRM
- Dashboard with metrics
- Contacts management (CRUD)
- Deals pipeline with stages
- Activities logging
- Tasks with priorities
- Data access requests

### ✅ Myn Customer Portal
- Data vault management
- Access grants control
- Request approval/rejection
- Earnings tracking
- Settings and preferences
- Wallet connection UI

### ✅ Continuum Blockchain
- Network dashboard with stats
- Smart contract deployment
- Blockchain explorer
- Recent blocks and transactions
- API key management
- Documentation access

### ✅ Core Features
- Product switching between apps
- Navigation across all sections
- UI components (dialogs, toasts, buttons)
- Form validation
- Loading states
- Empty states
- Error handling

## Test Commands

### Development
```bash
# Run tests with UI (best for development)
npm run test:e2e:ui

# Run specific test file
npx playwright test auth.spec.ts

# Run tests matching pattern
npx playwright test --grep "login"

# Run in debug mode
npm run test:e2e:debug
```

### CI/CD
```bash
# Run all tests (headless)
npm run test:e2e

# Generate report
npm run test:report
```

### Advanced
```bash
# Run on specific browser
npx playwright test --project=chromium

# Run with specific tag
npx playwright test --grep @smoke

# Update snapshots
npx playwright test --update-snapshots
```

## Writing Tests

### Basic Test Example

```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/your-page')
    await page.waitForLoadState('networkidle')
  })

  test('should do something', async ({ page }) => {
    // Arrange
    const button = page.locator('button', { hasText: 'Click Me' })

    // Act
    await button.click()

    // Assert
    await expect(page.locator('.result')).toBeVisible()
  })
})
```

### Using Helpers

```typescript
import { navigateAndWait, openDialog } from './helpers'

test('should open dialog', async ({ page }) => {
  await navigateAndWait(page, '/items')
  await openDialog(page, 'Add Item')
  await expect(page.locator('[role="dialog"]')).toBeVisible()
})
```

### Authentication Tests

```typescript
test('should handle auth redirect', async ({ page }) => {
  await page.goto('/protected-page')
  await page.waitForLoadState('networkidle')

  const isLoginPage = page.url().includes('/login')

  if (isLoginPage) {
    await expect(page.locator('h1')).toContainText('Welcome back')
  } else {
    // User is authenticated
    await expect(page.locator('h1')).toContainText('Dashboard')
  }
})
```

## Best Practices

### 1. Use Explicit Waits
```typescript
// ✅ Good
await page.waitForLoadState('networkidle')
await page.locator('.element').waitFor()

// ❌ Bad
await page.waitForTimeout(5000)
```

### 2. Descriptive Selectors
```typescript
// ✅ Good
await page.locator('button', { hasText: 'Submit' })
await page.locator('[data-testid="submit-button"]')

// ❌ Bad
await page.locator('div > div > button:nth-child(3)')
```

### 3. Independent Tests
```typescript
// ✅ Good - each test is independent
test('test 1', async ({ page }) => {
  await page.goto('/page')
  // ... test logic
})

test('test 2', async ({ page }) => {
  await page.goto('/page')
  // ... test logic
})

// ❌ Bad - tests depend on each other
let sharedData
test('test 1', async ({ page }) => {
  sharedData = await createData()
})

test('test 2', async ({ page }) => {
  await useData(sharedData) // ❌ Depends on test 1
})
```

### 4. Use test.skip for Auth
```typescript
test('authenticated feature', async ({ page }) => {
  await page.goto('/protected')

  if (page.url().includes('/login')) {
    test.skip() // Skip if not authenticated
  }

  // Test authenticated features
})
```

### 5. Handle Loading States
```typescript
test('should load data', async ({ page }) => {
  await page.goto('/dashboard')

  // Wait for loading to finish
  await page.locator('[class*="animate-spin"]').waitFor({ state: 'hidden' })

  // Now assert on loaded content
  await expect(page.locator('.data')).toBeVisible()
})
```

## Debugging

### 1. Use UI Mode
The Playwright UI is the best way to debug tests:
```bash
npm run test:e2e:ui
```

Features:
- Step through tests
- See live browser
- Inspect elements
- View test results
- Edit tests on the fly

### 2. Screenshots on Failure
Screenshots are automatically captured on failure in `test-results/`

### 3. Traces
View detailed traces:
```bash
npm run test:report
```

### 4. Console Logs
```typescript
test('debug test', async ({ page }) => {
  page.on('console', msg => console.log(msg.text()))

  await page.goto('/page')
  console.log('Current URL:', page.url())
})
```

### 5. Pause Execution
```typescript
test('debug with pause', async ({ page }) => {
  await page.goto('/page')
  await page.pause() // Pauses here - opens inspector
  await page.click('button')
})
```

## Common Issues & Solutions

### Issue: Test Timeout
```
Error: Test timeout of 30000ms exceeded
```

**Solution**:
```typescript
// Increase timeout for specific test
test.setTimeout(60000)

// Or in config
timeout: 60000
```

### Issue: Element Not Found
```
Error: locator.click: Target closed
```

**Solution**:
```typescript
// Wait for element explicitly
await page.locator('.element').waitFor()
await page.locator('.element').click()

// Or wait for network idle
await page.waitForLoadState('networkidle')
```

### Issue: Flaky Tests
**Solution**:
```typescript
// Use retry
test.describe.configure({ retries: 2 })

// Add explicit waits
await page.waitForSelector('.element')

// Wait for animations
await page.locator('.element').waitFor({ state: 'visible' })
```

### Issue: Auth Redirects
**Solution**:
```typescript
// Check for redirect and skip if needed
test('feature', async ({ page }) => {
  await page.goto('/protected')

  if (page.url().includes('/login')) {
    test.skip()
  }

  // Continue with test
})
```

## CI/CD Integration

Tests automatically run on GitHub Actions:
- **Trigger**: Push to main/master, PRs
- **Browser**: Chromium
- **Reports**: Uploaded as artifacts
- **Duration**: ~6-8 minutes

### Workflow File
`.github/workflows/playwright.yml`

### Required Secrets
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Performance

### Current Metrics
- **Total Tests**: 82+
- **Execution Time**: ~6-8 minutes
- **Pass Rate**: ~95%
- **Browser**: Chromium
- **Workers**: 1 (sequential)

### Optimization Tips
1. Use `test.skip()` for non-critical tests
2. Group related tests with `test.describe()`
3. Reuse page navigations with `beforeEach`
4. Minimize network waits
5. Use `--project` to run specific browsers only

## Resources

- [Playwright Docs](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)
- [CI/CD Guide](https://playwright.dev/docs/ci)
- [Test Generator](https://playwright.dev/docs/codegen)

## Test Coverage Goals

### Current Coverage: ~80%
- ✅ Authentication flows
- ✅ Main user journeys
- ✅ CRUD operations
- ✅ Navigation
- ✅ UI components
- ✅ Form validation

### Future Coverage
- [ ] Wallet integration
- [ ] On-chain transactions
- [ ] File uploads
- [ ] Advanced search
- [ ] Data export
- [ ] Email notifications
- [ ] Real-time updates
- [ ] Mobile responsive
- [ ] Accessibility audits
- [ ] Performance benchmarks

## Contributing

### Adding New Tests
1. Create test file: `tests/e2e/feature.spec.ts`
2. Follow naming convention
3. Use helpers from `helpers.ts`
4. Add authentication handling
5. Test locally: `npm run test:e2e:ui`
6. Update documentation
7. Submit PR

### Updating Tests
1. Identify failing test
2. Debug with UI mode
3. Fix test or implementation
4. Verify locally
5. Update documentation if needed
6. Submit PR with explanation

## Support

For help with tests:
1. Check this guide
2. Review test examples
3. Use Playwright docs
4. Run in UI mode for debugging
5. Ask the team

---

**Happy Testing!** 🎭
