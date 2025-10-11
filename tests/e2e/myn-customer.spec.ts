import { test, expect } from '@playwright/test'

// Helper to login
async function login(page: any) {
  await page.goto('/login')
  await page.fill('input[type="email"]', 'demo@continuum.app')
  await page.fill('input[type="password"]', 'demo123456')
  await page.click('button[type="submit"]')
  await page.waitForURL('/ethos/dashboard')
}

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
      await expect(page.locator('h1')).toContainText(/control.*data|Dashboard|Myn|Data Vault/i)
    }
  })

  test('should load Myn dashboard (when authenticated)', async ({ page }) => {
    await login(page)
    await page.goto('/myn/dashboard')
    await page.waitForLoadState('networkidle')

    await expect(page.locator('h1')).toContainText(/control.*data|Dashboard|Myn|Data Vault/i)
  })

  test('should navigate to vault page (when authenticated)', async ({ page }) => {
    await login(page)
    await page.goto('/myn/dashboard')
    await page.waitForLoadState('networkidle')

    await page.locator('a', { hasText: 'Vault' }).first().click()
    await expect(page).toHaveURL('/myn/vault')
    await expect(page.locator('h1')).toContainText('Data Vault')
  })

  test('should navigate to access grants page (when authenticated)', async ({ page }) => {
    await login(page)
    await page.goto('/myn/access')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveURL('/myn/access')
    await expect(page.locator('h1')).toContainText('Active Access')
  })

  test('should navigate to requests page (when authenticated)', async ({ page }) => {
    await login(page)
    await page.goto('/myn/dashboard')
    await page.waitForLoadState('networkidle')

    await page.locator('a', { hasText: 'Requests' }).first().click()
    await expect(page).toHaveURL('/myn/requests')
    await expect(page.locator('h1')).toContainText(/Data Requests|Requests/)
  })

  test('should navigate to earnings page (when authenticated)', async ({ page }) => {
    await login(page)
    await page.goto('/myn/dashboard')
    await page.waitForLoadState('networkidle')

    await page.locator('a', { hasText: 'Earnings' }).first().click()
    await expect(page).toHaveURL('/myn/earnings')
    await expect(page.locator('h1')).toContainText('Earnings')
  })

  test('should navigate to settings page (when authenticated)', async ({ page }) => {
    await login(page)
    await page.goto('/myn/dashboard')
    await page.waitForLoadState('networkidle')

    await page.locator('a', { hasText: 'Settings' }).first().click()
    await expect(page).toHaveURL('/myn/settings')
    await expect(page.locator('h1')).toContainText('Settings')
  })
})
