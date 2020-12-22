import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get('/users/register') as Promise<unknown>;
  }

  getNameTextbox()
  {
    return element(by.css("input[formControlName=name]"));
  }

  getEmailTextbox() {
    return element(by.css("input[formControlName=email]"));
  }
  getPasswordTextbox() {
    return element(by.css("input[formControlName=password]"));
  }
  getConfirmPasswordTextbox() {
    return element(by.css("input[formControlName=confirm_password]"));
  }
  getForm() {
    return element(by.tagName('form'));
  }

  getSubmitButton() {
    return element(by.css("button[type=submit]"));
  }
  getSnackBar()
  {
    return element(by.css("simple-snack-bar>span"));
  }
}
