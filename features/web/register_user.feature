@register
Feature: Scenarios related to register user

    Background:
        Given user is on home page

    @regression
    @sanity
    Scenario Outline: register a new user
        Given user navigate to registration page
        When the user enters the registration details "<firstName>", "<lastName>", "<email>", "<telephone>", "<password>", "<confirmPassword>", "<subscribe>"
        Then user should see a message "Your Account Has Been Created!"
        Then user logs out of application
        Then user should see a message "Account Logout"
        Examples:
            | firstName | lastName | email              | telephone  | password | confirmPassword | subscribe |
            | John      | Doe      | john_{0}@email.com | 9876543210 | test321  | test321         | yes       |
            | Jane      | Doe      | jane_{0}@email.com | 4321098765 | test123  | test123         | no        |