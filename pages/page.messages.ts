import { type Page } from '@playwright/test';

/** Locators and functions for the `scripture.api.bible/messages` page. */
export default class MessagesPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
