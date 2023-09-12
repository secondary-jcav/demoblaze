Feature: Sign Up Process

  Scenario: Successful sign up
    Given I visit the home page
    When I go to the sign-up page
    And I enter the sign-up details
    Then I should see a sign-up confirmation message
  
  Scenario: Successful Log In
    Given I visit the home page
    When I log in using valid credentials
    Then I should see my username on the dashboard
