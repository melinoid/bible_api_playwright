import { type Page } from '@playwright/test';

/** Locators and functions for `docs.api.bible` page. */
export default class DocsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
