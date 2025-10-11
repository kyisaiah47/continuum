# E2E Tests with Playwright

## Overview

This directory contains end-to-end tests for the Continuum platform using Playwright. The tests cover all three products (Ethos, Myn, Continuum) and verify critical user flows.

## Test Structure

```
tests/e2e/
├── auth.spec.ts                    # Authentication flows
├── ethos-crm.spec.ts               # Ethos CRM features
├── myn-customer.spec.ts            # Myn customer portal
├── continuum-blockchain.spec.ts    # Continuum blockchain platform
├── product-switcher.spec.ts        # Product switching functionality
├── navigation.spec.ts              # Navigation and routing
├── ui-components.spec.ts           # UI components and interactions
└── helpers.ts                      # Test utilities
```

## Test Coverage

### Authentication (auth.spec.ts)
- ✅ Home page loading
- ✅ Login page navigation and validation
- ✅ Signup page navigation
- ✅ Forgot password flow
- ✅ Password reset email confirmation
- ✅ Navigation between auth pages

### Ethos CRM (ethos-crm.spec.ts)
- ✅ Dashboard loading and metrics
- ✅ Contacts page with add/filter functionality
- ✅ Deals page with pipeline stages
- ✅ Activities page with logging
- ✅ Tasks page with creation
- ✅ Data access requests management

### Myn Customer Portal (myn-customer.spec.ts)
- ✅ Dashboard overview
- ✅ Data vault with categories
- ✅ Access grants management
- ✅ Data requests approval/rejection
- ✅ Earnings tracking
- ✅ Settings and wallet connection

### Continuum Blockchain (continuum-blockchain.spec.ts)
- ✅ Network dashboard with stats
- ✅ Smart contract deployment
- ✅ Blockchain explorer with search
- ✅ Recent blocks and transactions
- ✅ API keys management
- ✅ Documentation and playground

### Product Switcher (product-switcher.spec.ts)
- ✅ Switching between products
- ✅ Product preference persistence

### Navigation (navigation.spec.ts)
- ✅ Home to auth pages
- ✅ Protocol page
- ✅ Navigation within each product
- ✅ Footer links and network status

### UI Components (ui-components.spec.ts)
- ✅ Loading states
- ✅ Toast notifications
- ✅ Stat cards
- ✅ Empty states
- ✅ Dialogs and overlays
- ✅ Forms and inputs
- ✅ Status badges
- ✅ Accessibility

## Running Tests

### Run all tests (headless)
```bash
npm run test:e2e
```

### Run tests with UI mode (recommended for development)
```bash
npm run test:e2e:ui
```

### Run tests in headed mode (see browser)
```bash
npm run test:e2e:headed
```

### Debug a specific test
```bash
npm run test:e2e:debug
```

### View test report
```bash
npm run test:report
```

## Test Configuration

The tests are configured in `playwright.config.ts`:

- **Base URL**: http://localhost:3000
- **Browser**: Chromium (can add Firefox and WebKit)
- **Workers**: 1 (sequential execution to avoid conflicts)
- **Retries**: 2 on CI, 0 locally
- **Auto-start dev server**: Yes

## Environment Variables

Make sure you have `.env.local` with:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## CI/CD

Tests automatically run on:
- Push to main/master branches
- Pull requests

See `.github/workflows/playwright.yml` for configuration.

## Writing New Tests

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/your-page')
  })

  test('should do something', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Expected Text')
  })
})
```

### Using Helpers

```typescript
import { navigateAndWait, openDialog, waitForToast } from './helpers'

test('should create item', async ({ page }) => {
  await navigateAndWait(page, '/items')
  await openDialog(page, 'Add Item')
  await waitForToast(page, 'Item created')
})
```

## Best Practices

1. **Use data-testid attributes** for critical elements
2. **Wait for network idle** before assertions
3. **Use meaningful test names** that describe the scenario
4. **Group related tests** with describe blocks
5. **Keep tests independent** - don't rely on test order
6. **Use beforeEach** for common setup
7. **Take screenshots** on failure for debugging

## Debugging Tips

1. **UI Mode**: Use `npm run test:e2e:ui` to step through tests
2. **Headed Mode**: Use `npm run test:e2e:headed` to see the browser
3. **Debug Mode**: Use `npm run test:e2e:debug` for breakpoints
4. **Screenshots**: Check `test-results/` for failure screenshots
5. **Traces**: View traces in the HTML report

## Common Issues

### Test Timeouts
- Increase timeout in test: `test.setTimeout(60000)`
- Or in config: `timeout: 60000`

### Flaky Tests
- Add explicit waits: `await page.waitForSelector('.element')`
- Use `waitForLoadState('networkidle')`
- Increase retries for specific tests

### Element Not Found
- Check if element is in shadow DOM
- Use more specific selectors
- Wait for element to appear

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Tests](https://playwright.dev/docs/debug)
