import { Page } from '@playwright/test'

/**
 * Wait for page to finish loading
 */
export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('networkidle')
}

/**
 * Fill form and submit
 */
export async function fillAndSubmitForm(
  page: Page,
  fields: Record<string, string>,
  submitText: string = 'Submit'
) {
  for (const [selector, value] of Object.entries(fields)) {
    await page.locator(selector).fill(value)
  }

  await page.locator('button', { hasText: submitText }).click()
}

/**
 * Check if element exists without throwing
 */
export async function elementExists(page: Page, selector: string): Promise<boolean> {
  try {
    await page.locator(selector).waitFor({ timeout: 2000 })
    return true
  } catch {
    return false
  }
}

/**
 * Take screenshot with timestamp
 */
export async function takeTimestampedScreenshot(page: Page, name: string) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  await page.screenshot({ path: `test-results/${name}-${timestamp}.png` })
}

/**
 * Wait for toast notification
 */
export async function waitForToast(page: Page, text?: string) {
  const toastSelector = text
    ? `[data-sonner-toast]:has-text("${text}")`
    : '[data-sonner-toast]'

  await page.locator(toastSelector).waitFor({ timeout: 5000 })
}

/**
 * Open dialog by button text
 */
export async function openDialog(page: Page, buttonText: string) {
  await page.locator('button', { hasText: buttonText }).click()
  await page.locator('[role="dialog"]').waitFor()
}

/**
 * Close dialog
 */
export async function closeDialog(page: Page) {
  await page.locator('button', { hasText: 'Cancel' }).click()
  await page.locator('[role="dialog"]').waitFor({ state: 'hidden' })
}

/**
 * Navigate and wait
 */
export async function navigateAndWait(page: Page, url: string) {
  await page.goto(url)
  await waitForPageLoad(page)
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(page: Page): Promise<boolean> {
  // Check if we're redirected to login or if dashboard is accessible
  await page.goto('/ethos/dashboard')
  await page.waitForLoadState('networkidle')

  const currentUrl = page.url()
  return !currentUrl.includes('/login')
}
