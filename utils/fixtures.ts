import { test as base } from '@playwright/test';
import Helper from './helper';
import AccountPage from '../pages/page.account';
import AdminPage from '../pages/page.admin';
import AppsPage from '../pages/page.apps';
import CommonPage from '../pages/page.common';
import DocsPage from '../pages/page.docs';
import LoginPage from '../pages/page.login';
import MainPage from '../pages/page.main';
import MessagesPage from '../pages/page.messages';
import SignUpPage from '../pages/page.signup';

type Fixtures = {
  helper: Helper;
  accountPage: AccountPage;
  adminPage: AdminPage;
  appsPage: AppsPage;
  commonPage: CommonPage;
  docsPage: DocsPage;
  loginPage: LoginPage;
  mainPage: MainPage;
  messagesPage: MessagesPage;
  signUpPage: SignUpPage;
};

export const test = base.extend<Fixtures>({
  helper: async ({}, use) => {
    await use(new Helper());
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  adminPage: async ({ page }, use) => {
    await use(new AdminPage(page));
  },
  appsPage: async ({ page }, use) => {
    await use(new AppsPage(page));
  },
  commonPage: async ({ page }, use) => {
    await use(new CommonPage(page));
  },
  docsPage: async ({ page }, use) => {
    await use(new DocsPage(page));
  },
  loginPage: async ({ page, commonPage }, use) => {
    await use(new LoginPage(page, commonPage));
  },
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
  messagesPage: async ({ page }, use) => {
    await use(new MessagesPage(page));
  },
  signUpPage: async ({ page }, use) => {
    await use(new SignUpPage(page));
  },
});
