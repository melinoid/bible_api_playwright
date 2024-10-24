import { type Page } from '@playwright/test';

/** Locators and functions for `scripture.api.bible` main page. */
export default class MainPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
