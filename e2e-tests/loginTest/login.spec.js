const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../stepDefintion/LoginPage");


test.describe("Login Test", () => {



  test.beforeEach(async ({ page }) => {});



  test("Verify sign-in page validations", async ({ page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate_withAssertions();
  
  });



  test("Verify sign-in page with invalid login attempt", async ({ page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.Invalid_login();
    
  });



  test("Valid login flow", async ({ page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.valid_login();
  });



});
