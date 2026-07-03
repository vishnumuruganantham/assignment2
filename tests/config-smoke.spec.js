const { test, expect } = require('@playwright/test');
const { openLoginPage } = require('../helpers/loginpage')

test('smoke', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/EventHub/i);
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#login-btn')).toBeVisible();
});

test.only('page and browser context', async ({ page, browser }) => {
    await openLoginPage(page);
    await page.locator('#email').fill('beginner@sample.com');
    await expect(page.locator('#email')).toHaveValue('beginner@sample.com');

    const isolatedContext = await browser.newContext();
    const isolatedPage = await isolatedContext.newPage();

    await isolatedPage.goto('/login');
    await expect(isolatedPage.getByRole('heading', { name: 'Sign in to EventHub' })).toBeVisible();
    await expect(isolatedPage.locator('#email')).toHaveValue('');
    await isolatedContext.close();

});

/*
 * page fixture — Playwright automatically creates a fresh BrowserContext and
 *   opens one Page in it for each test. This `page` is ready to use — no
 *   setup or teardown needed. Each test gets its own page so they can't
 *   interfere with each other.
 *
 * browser context — a separate, isolated browser session container (like an
 *   incognito window). You can create additional contexts from the `browser`
 *   fixture via browser.newContext(). Each context has its own cookies,
 *   localStorage, and session state — completely independent of other contexts.
 *
 * fresh context = isolated state — every new browser context starts blank
 *   with no cookies, no cache, no localStorage carried over. This is why
 *   Playwright tests don't leak login sessions or data between tests — each
 *   test's default page lives inside its own fresh context.
 */