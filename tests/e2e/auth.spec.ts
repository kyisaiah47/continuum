import { test, expect } from '@playwright/test'

// Test user credentials
const TEST_USER = {
  email: 'test@example.com',
  password: 'testpassword123'
}

test.describe('Authentication Flow', () => {
  test('should load the home page', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Continuum/)
  })

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('h1')).toContainText('Welcome back')

    // Check for email and password fields
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
  })

  test('should show validation errors for empty login', async ({ page }) => {
    await page.goto('/login')

    const submitButton = page.locator('button[type="submit"]')
    await submitButton.click()

    // HTML5 validation should prevent submission
    const emailInput = page.locator('input[type="email"]')
    await expect(emailInput).toHaveAttribute('required')
  })

  test('should navigate to signup page', async ({ page }) => {
    await page.goto('/signup')
    await expect(page.locator('h1')).toContainText(/create.*account/i)

    // Check for required fields
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]').first()).toBeVisible()
  })

  test('should navigate to forgot password page', async ({ page }) => {
    await page.goto('/login')

    const forgotPasswordLink = page.locator('a', { hasText: 'Forgot password' })
    await forgotPasswordLink.click()

    await expect(page).toHaveURL('/forgot-password')
    await expect(page.locator('h1')).toContainText('Reset password')
  })

  test('should show password reset email sent confirmation', async ({ page }) => {
    await page.goto('/forgot-password')

    await page.locator('input[type="email"]').fill('test@example.com')
    await page.locator('button[type="submit"]').click()

    // Wait for success message
    await expect(page.locator('text=Check your email')).toBeVisible({ timeout: 5000 })
  })

  test('should navigate between login and signup', async ({ page }) => {
    await page.goto('/login')

    // Click sign up link
    await page.locator('a', { hasText: 'Sign up' }).click()
    await expect(page).toHaveURL('/signup')

    // Go back to login
    await page.locator('a', { hasText: /sign in/i }).click()
    await expect(page).toHaveURL('/login')
  })
})
