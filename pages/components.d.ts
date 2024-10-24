import { Locator } from '@playwright/test';

declare namespace Components {
  interface SelectField {
    label: Locator;
    select: Locator;
  }

  interface InputField {
    label: Locator;
    input: Locator;
  }
}
