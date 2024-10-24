import { type Page } from '@playwright/test';

/** Locators and functions for the `scripture.api.bible/admin` page. */
export default class AdminPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
