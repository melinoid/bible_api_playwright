import { test } from '../../../utils/fixtures';

test('Relogin', async ({ page, loginPage, commonPage }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'Logout' }).click();

  await page.waitForLoadState('load');

  await commonPage.checkLogoutLink();

  await page.getByRole('link', { name: 'Apps' }).click();

  await loginPage.fillOutForm();
});
