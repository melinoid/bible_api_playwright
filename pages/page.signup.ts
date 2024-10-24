import { type Page, type Locator } from '@playwright/test';
import { Components } from './components';

/** Locators and functions for the `scripture.api.bible/signup` page. */
export default class SignUpPage {
  readonly page: Page;

  readonly form: {
    readonly header: Locator;
    readonly typeField: Components.SelectField;
    readonly websiteField: Components.InputField;
    readonly organizationField: Components.InputField;
    readonly emailField: Components.InputField;
    readonly lastnameField: Components.InputField;
    readonly firstnameField: Components.InputField;
    readonly usernameField: Components.InputField;
    readonly passwordField: Components.InputField;
    readonly passConfirmField: Components.InputField;
    readonly termsLink: Locator;
    readonly signUpBtn: Locator;
  };

  constructor(page: Page) {
    this.page = page;

    this.form = {
      header: page.getByText('Create your account'),
      typeField: {
        label: page.getByText('type *'),
        select: page.getByLabel('type *'),
      },
      websiteField: {
        label: page.getByText('Website'),
        input: page.getByLabel('Website'),
      },
      organizationField: {
        label: page.getByText('Organization/Group Name *'),
        input: page.getByLabel('Organization/Group Name *'),
      },
      emailField: {
        label: page.getByText('Email *'),
        input: page.getByLabel('Email *'),
      },
      lastnameField: {
        label: page.getByText('Last Name *'),
        input: page.getByLabel('Last Name *'),
      },
      firstnameField: {
        label: page.getByText('First Name *'),
        input: page.getByLabel('First Name *'),
      },
      usernameField: {
        label: page.getByText('Username *'),
        input: page.getByLabel('Username *'),
      },
      passwordField: {
        label: page.getByLabel('Password *'),
        input: page.getByLabel('Password *'),
      },
      passConfirmField: {
        label: page.getByText('Password confirmation *'),
        input: page.getByLabel('Password confirmation *'),
      },
      termsLink: page.getByRole('link', { name: 'View terms and conditions of' }),
      signUpBtn: page.getByRole('button', { name: 'Sign up' }),
    };
  }
}
