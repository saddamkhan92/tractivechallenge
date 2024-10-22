const { test,expect } = require("@playwright/test");
const loginPageElements = require("../pageElements/LoginPageElements");
const { chromium } = require('playwright');
const fs = require('fs');


exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
  }
  
  generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;}


  async navigate_withAssertions() {


   const signIn_Title = this.page.locator(loginPageElements.signinTitle);
   const forgot_pwd = this.page.locator(loginPageElements.forgot)
   

    await this.page.goto("https://my-stage.tractive.com/");

    await expect(signIn_Title).toBeVisible();  
    await expect(forgot_pwd).toBeVisible();    

    const [popup] = await Promise.all([
      this.page.context().waitForEvent('page'),  // Wait for a new page event (popup)
      this.page.click(loginPageElements.apple_signin),// Replace with your Google login button selector
    ]);

    await popup.waitForLoadState();

    const apple_account = await popup.locator(loginPageElements.apple_account);
    await expect(apple_account).toBeVisible();  
    await popup.close();

    const google_iframe = await this.page.frame({ url:/accounts\.google\.com\/gsi\/button/ });   

    const [popup1] = await Promise.all([
      this.page.context().waitForEvent('page'),  // Wait for a new page event (popup)
      google_iframe.click(loginPageElements.google_signin)
    ]);

    await popup1.waitForLoadState();

    const google_account = await popup1.locator(loginPageElements.google_account);
    await expect(google_account).toBeVisible();  
    await popup1.close();
   
  }

 
  async Invalid_login() {

    await this.page.goto("https://my-stage.tractive.com/");
    const email = this.page.locator(loginPageElements.email_field);
    const password = this.page.locator(loginPageElements.password_field);
    const signIn_button = this.page.locator(loginPageElements.signIn_button);
    const error_msg= this.page.locator(loginPageElements.error_popup);

    const randomstring = this.generateRandomString(10);

   await email.fill(randomstring +'@vd.com');
   await password.fill(randomstring);
   await signIn_button.click();

   await error_msg.waitFor({ state: 'visible' });
   expect(await error_msg.isVisible()).toBeTruthy();
    
  }


  async valid_login() {

    await this.page.goto("https://my-stage.tractive.com/");

    const credentials = JSON.parse(fs.readFileSync('./Global/credentials.json', 'utf-8'));
    const { email, password } = credentials;
    
    const login_email = this.page.locator(loginPageElements.email_field);
    const login_password = this.page.locator(loginPageElements.password_field);
    const signIn_button = this.page.locator(loginPageElements.signIn_button);
    const after_login = this.page.locator(loginPageElements.afterlogin_tracker)

    await login_email.fill(email);
    await login_password.fill(password);
    await signIn_button.click();

    await after_login.waitFor({ state: 'visible' });
    expect(await after_login.isVisible()).toBeTruthy();
    await after_login.click();

   }

 

};
