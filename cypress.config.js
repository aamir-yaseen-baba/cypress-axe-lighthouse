const { defineConfig } = require("cypress");
const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse")
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const fs = require("fs");
module.exports = defineConfig({
  lighthouse: {
    options: {
      formFactor: "desktop",
      output: 'html',
      screenEmulation: {
        width: 1350,
        height: 940,
        deviceScaleRatio: 1,
        mobile: false,
        disable: false,
      },
      throttling: {
        rttMs: 40,
        throughputKbps: 11024,
        cpuSlowdownMultiplier: 1,
        requestLatencyMs: 0,
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0,
      },
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });
      on("task", {
        lighthouse: lighthouse((lighthouseReport) => {
          console.log("---- Writing lighthouse report to disk ----");
    
          fs.writeFile("lighthouse.html", lighthouseReport.report, (error) => {
            error ? console.log(error) : console.log("Report created successfully");
          });
        }),
      });
      on('task', {
        log(message) {
          console.log(message)
    
          return null
        },
        table(message) {
          console.table(message)
    
          return null
        }
      })
      allureWriter(on, config);
      return config;
    },
  },
});
