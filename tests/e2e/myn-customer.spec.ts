import { test, expect } from '@playwright/test'

test.describe('Myn Customer Portal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/myn/dashboard')
    await page.waitForLoadState('networkidle')
  })

  test('should load Myn dashboard or redirect to login', async ({ page }) => {
    const isLoginPage = page.url().includes('/login')

    if (isLoginPage) {
      await expect(page.locator('h1')).toContainText('Welcome back')
    } else {
      await expect(page.locator('h1')).toContainText(/control.*data|Dashboard|Myn/i)
    }
  })

  test('should load Myn dashboard (when authenticated)', async ({ page }) => {
    if (page.url().includes('/login')) {
      test.skip()
    }

    await expect(page.locator('h1')).toContainText(/control.*data|Dashboard|Myn/i)

    // Check for key sections
    await expect(page.locator('text=My Data').first()).toBeVisible()
  })

  test('should navigate to vault page (when authenticated)', async ({ page }) => {
    if (page.url().includes('/login')) {
      test.skip()
    }

    await page.locator('a', { hasText: 'Vault' }).first().click()
    await expect(page).toHaveURL('/myn/vault')
    await expect(page.locator('h1')).toContainText('Data Vault')
  })

  test('should navigate to access grants page (when authenticated)', async ({ page }) => {
    if (page.url().includes('/login')) {
      test.skip()
    }

    await page.locator('a', { hasText: 'Access Grants' }).first().click()
    await expect(page).toHaveURL('/myn/access')
    await expect(page.locator('h1')).toContainText('Access Grants')
  })

  test('should navigate to requests page (when authenticated)', async ({ page }) => {
    if (page.url().includes('/login')) {
      test.skip()
    }

    await page.locator('a', { hasText: 'Requests' }).first().click()
    await expect(page).toHaveURL('/myn/requests')
    await expect(page.locator('h1')).toContainText(/Data Requests|Requests/)
  })

  test('should navigate to earnings page (when authenticated)', async ({ page }) => {
    if (page.url().includes('/login')) {
      test.skip()
    }

    await page.locator('a', { hasText: 'Earnings' }).first().click()
    await expect(page).toHaveURL('/myn/earnings')
    await expect(page.locator('h1')).toContainText('Earnings')
  })

  test('should navigate to settings page (when authenticated)', async ({ page }) => {
    if (page.url().includes('/login')) {
      test.skip()
    }

    await page.locator('a', { hasText: 'Settings' }).first().click()
    await expect(page).toHaveURL('/myn/settings')
    await expect(page.locator('h1')).toContainText('Settings')
  })
})
