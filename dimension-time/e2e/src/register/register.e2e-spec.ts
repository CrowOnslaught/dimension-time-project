import { AppPage as RegiserPage } from './register.po';
import { browser } from 'protractor';

describe('Register tests', () => {
  let page: RegiserPage;

  beforeEach(() => {
    page = new RegiserPage();
    page.navigateTo();
  });

  it('check register navigates to login when registered user is valid',async ()=>{

    await page.getNameTextbox().sendKeys('john');
    await page.getEmailTextbox().sendKeys('aaaaaaaaaaa@email.com');
    await page.getPasswordTextbox().sendKeys('123456');
    await page.getConfirmPasswordTextbox().sendKeys('123456');


    let l_submitButton = await page.getSubmitButton();
    expect(l_submitButton.isEnabled()).toBeTruthy();

    await l_submitButton.submit();
    let url = await browser.getCurrentUrl();
    expect(url).toContain('users/login');
  });
  it('check register button is disabled with invalid credentials',async ()=>{

    await page.getNameTextbox().sendKeys('john');
    await page.getEmailTextbox().sendKeys('john@email.com');
    await page.getPasswordTextbox().sendKeys('123456');
    await page.getConfirmPasswordTextbox().sendKeys('aaaaaaaaa');


    let l_submitButton = await page.getSubmitButton();
    expect(l_submitButton.isEnabled()).toBeFalsy();
  });
  it('check error feedback when register failed', async ()=>
  {
    await page.getNameTextbox().sendKeys('john');
    await page.getEmailTextbox().sendKeys('john@email.com');
    await page.getPasswordTextbox().sendKeys('123456');
    await page.getConfirmPasswordTextbox().sendKeys('123456');


    let l_submitButton = await page.getSubmitButton();
    expect(l_submitButton.isEnabled()).toBeTruthy();

    await l_submitButton.submit();

    let l_snackText = await page.getSnackBar().getText();
    console.log("---------------------"+l_snackText);
    expect(l_snackText).toEqual('Register Error');
  })
});
