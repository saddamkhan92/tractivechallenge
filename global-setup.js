import {browser, chromium, expect, page} from "@playwright/test";

async function globalSetup(){

    const browser = await chromium.launch();
    const context = await browser.newContext();
 
    const cookies = [
     {
       name: 'interview',
       value: '7lBPV9iik6r9MNE5dKw9nzF9CstdlEJl',
       domain: '.tractive.com',
       path: '/'
     },
     {
       name: 'domain',
       value: '.tractive.com',
       domain:'.tractive.com',
       path: '/'
     }
 
   ];
    await context.addCookies(cookies);
    const page = await context.newPage(); 
    
 
     await page.goto("https://my-stage.tractive.com/");

     await page.context().storageState({path: "./Global/cookies.json"});

  

     

}

export default globalSetup;
