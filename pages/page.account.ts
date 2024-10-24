import { type Page } from '@playwright/test';

/** Locators and functions for the `scripture.api.bible/admin/account` page. */
export default class AccountPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
