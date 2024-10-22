const { test, expect } = require("@playwright/test");
const { RegPage } = require("../../stepDefintion/RegistrationPage");



test.describe("Registration Tests", () => {

  test.beforeEach(async ({ page }) => {
  
  });

//#############################################################

  test("Verify registration page validation", async ({page}) => {
    const regpage = new RegPage(page);
 
    await regpage.registration();
    
  })

//#############################################################

  test("Verify registration flow", async ({page}) => {
    const regpage = new RegPage(page);
 
    await regpage.registration();
    
  })

//#############################################################

});