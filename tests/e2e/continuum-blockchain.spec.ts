import { test, expect } from '@playwright/test'

test.describe('Continuum Blockchain Platform', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/continuum/dashboard')
    // Wait for either dashboard or login redirect
    await page.waitForLoadState('networkidle')
  })

  test('should load Continuum dashboard or redirect to login', async ({ page }) => {
    // Check if redirected to login (expected behavior without auth)
    const isLoginPage = page.url().includes('/login')

    if (isLoginPage) {
      await expect(page.locator('h1')).toContainText('Welcome back')
    } else {
      await expect(page.locator('h1')).toContainText(/Network|Dashboard|Continuum/)
    }
  })

  test('should load Continuum dashboard (when authenticated)', async ({ page }) => {
    // Skip if redirected to login
    if (page.url().includes('/login')) {
      test.skip()
    }

    await expect(page.locator('h1')).toContainText(/Network|Dashboard|Continuum/)

    // Check for key metrics
    await expect(page.locator('text=Total Transactions').first()).toBeVisible()
    await expect(page.locator('text=Active Contracts').first()).toBeVisible()
  })

  test('should show network status (when authenticated)', async ({ page }) => {
    if (page.url().includes('/login')) {
      test.skip()
    }

    await expect(page.locator('text=Network Status').first()).toBeVisible()
  })

  test('should show recent activity section (when authenticated)', async ({ page }) => {
    if (page.url().includes('/login')) {
      test.skip()
    }

    await expect(page.locator('text=Recent Activity').first()).toBeVisible()
  })

  test('should navigate to contracts page (when authenticated)', async ({ page }) => {
    if (page.url().includes('/login')) {
      test.skip()
    }

    await page.locator('a', { hasText: 'Contracts' }).first().click()
    await expect(page).toHaveURL('/continuum/contracts')
    await expect(page.locator('h1')).toContainText('Smart Contracts')
  })

  test('should show deploy contract button (when authenticated)', async ({ page }) => {
    await page.goto('/continuum/contracts')
    await page.waitForLoadState('networkidle')

    if (page.url().includes('/login')) {
      test.skip()
    }

    const deployButton = page.locator('button', { hasText: /deploy.*contract/i }).first()
    await expect(deployButton).toBeVisible()
  })

  test('should navigate to explorer page (when authenticated)', async ({ page }) => {
    if (page.url().includes('/login')) {
      test.skip()
    }

    await page.locator('a', { hasText: 'Explorer' }).first().click()
    await expect(page).toHaveURL('/continuum/explorer')
    await expect(page.locator('h1')).toContainText('Explorer')
  })

  test('should navigate to API keys page (when authenticated)', async ({ page }) => {
    if (page.url().includes('/login')) {
      test.skip()
    }

    await page.locator('a', { hasText: 'API Keys' }).first().click()
    await expect(page).toHaveURL('/continuum/api-keys')
    await expect(page.locator('h1')).toContainText('API Keys')
  })
})
