const {test, expect } = require("@playwright/test");
const RegistrationPageElements = require("../pageElements/RegistrationPageElements");
const loginPageElements = require("../pageElements/LoginPageElements");

const fs = require('fs'); 

 exports.RegPage = class RegPage {
  constructor(page) {
    this.page = page;
  };
  

  async reg_pageValidate() {

    await this.page.goto("https://my-stage.tractive.com/");

    const create_account = this.page.locator(loginPageElements.sign_up);
    await create_account.waitFor({state: 'visible'});
    await create_account.click();

     const reg_title = this.page.locator(RegistrationPageElements.register_page);
     await reg_title.waitFor({ state: 'visible' });
     expect(await reg_title.isVisible()).toBeTruthy();

     const reg_firstname = this.page.locator(RegistrationPageElements.reg_firstname);
     const reg_lastname = this.page.locator(RegistrationPageElements.reg_lastname);
     const reg_email = this.page.locator(RegistrationPageElements.reg_email);
     const reg_pwd = this.page.locator(RegistrationPageElements.reg_password);

     reg_firstname.type(' ');
     reg_title.click({delay: 200});

     const fname_req=this.page.locator(RegistrationPageElements.fname_req);
     await expect(fname_req).toBeVisible(); 

     reg_lastname.type(' ');
     reg_title.click({delay: 200});

     const lname_required=this.page.locator(RegistrationPageElements.lname_req);
     await expect(lname_required).toBeVisible(); 

     reg_email.type('saddam');
     reg_title.click({delay: 200});

     const email_req=this.page.locator(RegistrationPageElements.valid_email);
     await expect(email_req).toBeVisible(); 

     reg_pwd.type('khan');
     reg_title.click({delay: 200});

     const valid_pwd=this.page.locator(RegistrationPageElements.valid_password);
     await expect(valid_pwd).toBeVisible(); 

  }


  generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;}


  async registration() {
 
    const randomstring = this.generateRandomString(8);

    const email = randomstring + '@vd.co';
    const password = randomstring;

    await this.page.goto("https://my-stage.tractive.com/");
    
    const cookies = await this.page.context().cookies();
    const newCookies = cookies.map(cookie => ({
      name: cookie.name,
      value: cookie.value,
      domain: '.tractive.com',  // Adjust this to the correct domain if needed
      path: cookie.path || '/', // Keep the path same as before
      httpOnly: cookie.httpOnly,
      secure: cookie.secure,
      sameSite: cookie.sameSite,
      expires: cookie.expires,
    }));
 
     const create_account = this.page.locator(loginPageElements.sign_up);
      await create_account.waitFor({state: 'visible'});
      await create_account.click();
 
 
      const reg_firstname = this.page.locator(RegistrationPageElements.reg_firstname);
      const reg_lastname = this.page.locator(RegistrationPageElements.reg_lastname);
      const reg_email = this.page.locator(RegistrationPageElements.reg_email);
      const reg_pwd = this.page.locator(RegistrationPageElements.reg_password);
      const reg_create = this.page.locator(RegistrationPageElements.create_account);
      const after_reg = this.page.locator(RegistrationPageElements.activation_tracker);
      const reg_checkbox = this.page.locator(RegistrationPageElements.checkbox);
 
      await reg_firstname.type(randomstring, { delay: 200 });
      await reg_lastname.type(randomstring, { delay: 200 });
      await reg_email.type(email, { delay: 200 });
      await reg_pwd.type(password, { delay: 200 });
      await reg_checkbox.check();

      await expect(reg_create).toBeEnabled();
      await reg_create.click({delay: 5000 });

       await this.page.context().addCookies(newCookies);
      
      await after_reg.waitFor({ state: 'visible', delay: 6000 });
     expect(await after_reg.isVisible()).toBeTruthy();

      const credentials = { email, password };
      fs.writeFileSync('./Global/credentials.json', JSON.stringify(credentials));

   }
 
};
