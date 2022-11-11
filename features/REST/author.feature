@rest @author
Feature: Scenarios related to Author REST API in Library Information System

    Background:
        Given user has access to Library Information System

    @regression @sanity @authors
    Scenario: Retrieve list of Books in the Library Information System
        When user makes a request to retrieves all the Authors in the System
        Then user should get a status code 200
            And user should get list of Authors

    @regression @sanity @singleAuthor
    Scenario: Retrieve a single book in the Library Information System
        When user makes a request to retrieve an Author with id 1
        Then user should get a status code 200
            And user should get the author with id 1