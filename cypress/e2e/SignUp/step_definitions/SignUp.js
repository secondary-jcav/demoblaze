import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

const utils = require("../../../support/utils.js");

const signUpDashboardButton = '[id="signin2"]';
const signUpUsernameInput = '[id="sign-username"]';
const signUpPasswordInput = '[id="sign-password"]';
const signUpButtonText = "Sign up";
const loginDashboardButton = '[id="login2"]';
const logoutDashboardButton = '[id="logout2"]';
const loginPersona = "test.admin";
const userOnDashboard = '[id="nameofuser"]';

const userName = utils.generateRandomString();
const userPassword = utils.generateRandomString();

When("I go to the sign-up page", () => {
  // Click on Sign Up in the dashboard
  cy.get(signUpDashboardButton).click();
});

When("I enter the sign-up details", () => {
  // Sign up with a new account
  cy.intercept("POST", "https://api.demoblaze.com/signup").as("signupCall");
  cy.get(signUpUsernameInput).type(userName, { force: true });
  cy.get(signUpPasswordInput).type(userPassword, { force: true });
  cy.get("button").contains(signUpButtonText).click();
});

When("I click on log out", () => {
  cy.get(logoutDashboardButton).click();
});

Then("I should see a sign-up confirmation message", () => {
  // Alert confirms sign-up is successful
  cy.wait("@signupCall").then(() => {
    cy.on("window:alert", (alert) => {
      expect(alert).to.contains("Sign up successful.");
    });
  });
});

Then("I should see my username on the dashboard", () => {
  // confirm my username is displayed
  cy.wait("@loginCall").then(() => {
    cy.get(userOnDashboard).should("have.text", `Welcome ${loginPersona}`);
  });
});

Then("I expect the log in prompt in the dashboard", () => {
  // Login button is displayed, my username is not
  cy.get(loginDashboardButton).should("exist");
  cy.get(userOnDashboard).should("not.contain.text", loginPersona);
});
