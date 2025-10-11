import { test, expect } from '@playwright/test'

test.describe('Ethos CRM Features', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Ethos dashboard
    await page.goto('/ethos/dashboard')
    await page.waitForLoadState('networkidle')
  })

  test('should load Ethos dashboard or redirect to login', async ({ page }) => {
    const isLoginPage = page.url().includes('/login')

    if (isLoginPage) {
      await expect(page.locator('h1')).toContainText('Welcome back')
    } else {
      await expect(page.locator('h1')).toContainText(/Dashboard|CRM|Ethos/)
    }
  })

  test('should load Ethos dashboard (when authenticated)', async ({ page }) => {
    if (page.url().includes('/login')) {
      test.skip()
    }

    await expect(page.locator('h1')).toContainText(/Dashboard|CRM|Ethos/)

    // Check for main metrics
    await expect(page.locator('text=Total Contacts').first()).toBeVisible()
    await expect(page.locator('text=Active Deals').first()).toBeVisible()
  })

  test('should navigate to contacts page (when authenticated)', async ({ page }) => {
    if (page.url().includes('/login')) {
      test.skip()
    }

    await page.locator('a', { hasText: 'Contacts' }).first().click()
    await expect(page).toHaveURL('/ethos/contacts')
    await expect(page.locator('h1')).toContainText('Contacts')
  })

  test('should navigate to deals page (when authenticated)', async ({ page }) => {
    if (page.url().includes('/login')) {
      test.skip()
    }

    await page.locator('a', { hasText: 'Deals' }).first().click()
    await expect(page).toHaveURL('/ethos/deals')
    await expect(page.locator('h1')).toContainText(/Pipeline|Deals/)
  })

  test('should navigate to activities page (when authenticated)', async ({ page }) => {
    if (page.url().includes('/login')) {
      test.skip()
    }

    await page.locator('a', { hasText: 'Activities' }).first().click()
    await expect(page).toHaveURL('/ethos/activities')
    await expect(page.locator('h1')).toContainText('Activities')
  })

  test('should navigate to tasks page (when authenticated)', async ({ page }) => {
    if (page.url().includes('/login')) {
      test.skip()
    }

    await page.locator('a', { hasText: 'Tasks' }).first().click()
    await expect(page).toHaveURL('/ethos/tasks')
    await expect(page.locator('h1')).toContainText('Tasks')
  })

  test('should navigate to data access page (when authenticated)', async ({ page }) => {
    if (page.url().includes('/login')) {
      test.skip()
    }

    await page.locator('a', { hasText: 'Data Access' }).first().click()
    await expect(page).toHaveURL('/ethos/data-access')
    await expect(page.locator('h1')).toContainText('Data Access')
  })
})
