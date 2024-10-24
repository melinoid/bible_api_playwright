import { expect, Locator, type Page } from '@playwright/test';

interface CheckHeaderParam {
  authorized?: boolean;
  mobileView?: boolean;
}

/** Locators and functions for common interface elements. */
export default class CommonPage {
  readonly page: Page;

  readonly header: {
    readonly logo: Locator;
    readonly homeLink: Locator;
    readonly docsLink: Locator;
    readonly apiRefLink: Locator;
    readonly appsLink: Locator;
    readonly settingsLink: Locator;
    readonly logoutLink: Locator;

    // Mobile view elements
    readonly openMenuBtn: Locator;
    readonly closeMenuBtn: Locator;
  };
  readonly footer: {
    readonly copyright: Locator;
  };

  constructor(page: Page) {
    this.page = page;

    this.header = {
      logo: page.locator('header a.brand-header--logo-link img'),

      homeLink: page.locator('header nav ul:nth-child(1) li a:text-is("Home")'),
      docsLink: page.locator('header nav ul:nth-child(1) li a:text-is("Documentation")'),
      apiRefLink: page.locator('header nav ul:nth-child(1) li a:text-is("API Reference")'),
      appsLink: page.locator('header nav ul:nth-child(2) li a:text-is("Apps")'),
      settingsLink: page.locator('header nav ul:nth-child(2) li a:text-is("Settings")'),
      logoutLink: page.locator('header nav ul:nth-child(2) li a:text-is("Logout")'),

      openMenuBtn: page.locator('header .menu-icon-wrapper img[alt="Menu"]'),
      closeMenuBtn: page.locator('header .menu-icon-wrapper img[alt="Close Menu"]'),
    };
    this.footer = { copyright: page.locator('footer p:text("© 2024 API.Bible,")') };
  }

  /**
   * Check the contents of the menu.
   *
   * `Important:` For mobile menu view, it is expected that the menu is previously hidden
   * @param authorized (default: false) page was authorized.
   * @param mobileView (default: false) pаge in mobile view.
   */
  async checkHeader(params?: CheckHeaderParam) {
    const standingLinks = [
      this.header.homeLink,
      this.header.docsLink,
      this.header.apiRefLink,
      this.header.appsLink,
      this.header.settingsLink,
    ];

    expect(this.header.logo).toBeVisible();
    if (params?.mobileView) {
      await this.header.openMenuBtn.click();
      for (let locator of standingLinks) {
        await expect(locator).toBeVisible();
      }
      await this.checkLogoutLink();
    } else {
      for (let locator of standingLinks) {
        await expect(locator).toBeVisible();
      }
      await this.checkLogoutLink();
    }
  }

  /**
   * Check the display of the logout button to check authorization on the page.
   * @param authorized page was authorized.
   * @param mobileView pаge in mobile view.
   */
  async checkLogoutLink(params?: CheckHeaderParam) {
    const logoutIsVisible = await this.header.logoutLink.isVisible();
    const authorized = params?.authorized ? params.authorized : false;
    function err() {
      throw Error(
        `Logout button must${authorized ? '' : "n't"} be visible, when user is${authorized ? '' : ' not'} authorized.`
      );
    }

    if (params?.mobileView) {
      const menuIsClosed = await this.header.closeMenuBtn.isHidden();
      if (menuIsClosed && !logoutIsVisible) {
        await this.header.openMenuBtn.click();
        if (!!(+authorized ^ +logoutIsVisible)) {
          err();
        }
      } else if (!menuIsClosed) {
        if (!!(+authorized ^ +logoutIsVisible)) {
          err();
        }
      } else {
        throw Error("Logout button must't be visible, when mobile menu is closed.");
      }
    } else {
      if (!!(+authorized ^ +logoutIsVisible)) {
        err();
      }
    }
  }
}
