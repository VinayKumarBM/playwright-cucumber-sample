@search
Feature: Scenarios related to search product

    Background:
        Given user is on home page

    @regression @sanity @validSearch
    Scenario Outline: serach for a product
        When the user searches for product "<product>"
        Then user should see "<product>" product displayed on search result
        Examples:
            | product |
            | iPod    |
            | Mac     |

    @regression @invalidSearch
    Scenario: Search with invalid product
        When the user searches for product "invalid product"
        Then user should see a search result message as "There is no product that matches the search criteria."