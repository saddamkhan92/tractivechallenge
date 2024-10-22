const { devices } = require('@playwright/test');



/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {

  globalSetup: './global-setup',
  testDir: './e2e-tests',
  
  timeout: 50 * 10000,
  expect: {
   
    timeout: 8000,
  },
 
  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,
  
  workers: process.env.CI ? 1 : undefined,

  use: {
    headless: false,
    
    actionTimeout: 0,
    
    baseURL: 'https://staging.tractive.com/',

 
    screenshot: 'on',

  
    trace: 'on-first-retry',

    storageState:"./Global/cookies.json",

  },


 
  projects: [
    
    {
      name: 'Google Chrome',
      use: {
        channel: 'chrome',
      },
    }

  ],

 
  outputDir: 'test-results/',

};

module.exports = config;
