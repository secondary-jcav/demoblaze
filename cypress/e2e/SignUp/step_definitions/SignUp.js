import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

const utils = require("../../../support/utils.js");

const signUpButton = '[id="signin2"]';
const signUpUsername = '[id="sign-username"]';
const signUpPassword = '[id="sign-password"]';
const signUpButtonText = "Sign up";
const loginButton = '[id="login2"]';
const loginUsername = '[id="loginusername"]';
const loginPassword = '[id="loginpassword"]';
const loginButtonText = "Log in";
const registeredUser = '[id="nameofuser"]';

const userName = utils.generateRandomString();
const userPassword = utils.generateRandomString();

Given("I visit the home page", () => {
  cy.visit("https://www.demoblaze.com/");
});

When("I go to the sign-up page", () => {
  cy.get(signUpButton).click();
});

When("I enter the sign-up details", () => {
  cy.intercept("POST", "https://api.demoblaze.com/signup").as("signup");
  cy.get(signUpUsername).type(userName, { force: true });
  cy.get(signUpPassword).type(userPassword, { force: true });
  cy.get("button").contains(signUpButtonText).click();
});

Then("I should see a sign-up confirmation message", () => {
  cy.wait("@signup").then(() => {
    cy.on("window:alert", (alert) => {
      //assertions
      expect(alert).to.contains("Sign up successful.");
    });
  });
});

When("I log in using valid credentials", () => {
  cy.get(loginButton).click();
  cy.get(loginUsername).type(userName, { force: true });
  cy.get(loginPassword).type(userPassword, { force: true });
  cy.get("button").contains(loginButtonText).click();
});

Then("I should see my username on the dashboard", () => {
  cy.get(registeredUser).should("have.text", `Welcome ${userName}`);
});

When("I log out", () => {
  cy.get("#logoutLink").click();
});

Then("I should be redirected to the home page", () => {
  cy.url().should("eq", "https://www.demoblaze.com/");
});
