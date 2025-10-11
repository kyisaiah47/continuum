import { test, expect } from '@playwright/test'

/**
 * Tests for public pages that don't require authentication
 */
test.describe('Public Pages', () => {
  test('should load home page', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Continuum/)

    // Check for main sections
    await expect(page.locator('text=The Trust Layer').first()).toBeVisible()
    await expect(page.locator('h1')).toContainText(/Continuum/)
  })

  test('should have navigation links on home page', async ({ page }) => {
    await page.goto('/')

    // Check for key links
    const loginLink = page.locator('a', { hasText: /login/i }).first()
    const signupLink = page.locator('a', { hasText: /get started/i }).first()

    await expect(loginLink).toBeVisible()
    await expect(signupLink).toBeVisible()
  })

  test('should show product information on home page', async ({ page }) => {
    await page.goto('/')

    // Check for product mentions - use first() to handle multiple matches
    await expect(page.locator('text=Ethos').first()).toBeVisible()
    await expect(page.locator('text=Myn').first()).toBeVisible()
  })

  test('should have footer on home page', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Footer is at bottom of page, scroll to it
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await expect(page.locator('footer')).toBeVisible()
  })

  test('should navigate from home to auth pages', async ({ page }) => {
    await page.goto('/')

    // Go to login
    await page.locator('a', { hasText: /login/i }).first().click()
    await expect(page).toHaveURL('/login')

    // Back to home
    await page.goto('/')

    // Go to signup
    await page.locator('a', { hasText: /get started/i }).first().click()
    await expect(page).toHaveURL('/signup')
  })
})
