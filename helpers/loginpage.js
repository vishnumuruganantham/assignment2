async function openLoginPage(page) {
    await page.goto('/login');
}

module.exports = { openLoginPage };