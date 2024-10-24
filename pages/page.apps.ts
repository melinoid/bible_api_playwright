import { type Page } from '@playwright/test';

/** Locators and functions for `scripture.api.bible/admin/applications` page. */
export default class AppsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
