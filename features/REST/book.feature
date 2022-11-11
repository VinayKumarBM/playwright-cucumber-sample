@rest @book
Feature: Scenarios related to Book REST API in Library Information System

    Background:
        Given user has access to Library Information System

    @regression @sanity @books
    Scenario: Retrieve list of Books in the Library Information System
        When user makes a request to retrieves all the Books in the System
        Then user should get a status code 200
            And user should get list of Books

    @regression @sanity @singleBook
    Scenario: Retrieve a single book in the Library Information System
        When user makes a request to retrieve an Book with id 1
        Then user should get a status code 200
            And user should get the Book with id 1

    @regression @sanity @addBook
    Scenario Outline: Add a new book into Library Information System
        When user adds a book with details "<bookName>", "<available>", <genreId>, "<genreName>", <authorID>, "<authorName>", <age>, "<dateAdded>", "<dateAddedIso>"
        Then user should get a status code 200
            And user should be able to added Book "<bookName>", "<available>", <genreId>, <authorID>, "<dateAddedIso>"
        Examples:
            | bookName              | available | genreId | genreName       | authorID | authorName    | age | dateAdded  | dateAddedIso |
            | To Kill a Mockingbird | true      | 21      | Southern Gothic | 31       | Harper Lee    | 45  | 1960-07-11 | 2015-01-01   |
            | Alice in Wonderland   | false     | 51      | Fantasy Fiction | 19       | Lewis Carroll | 68  | 1865-11-01 | 1990-10-01   |

    @regression @sanity @deleteBook
    Scenario Outline: Delete the book in the Library Information System
        When user adds a book with details "<bookName>", "<available>", <genreId>, "<genreName>", <authorID>, "<authorName>", <age>, "<dateAdded>", "<dateAddedIso>"
        Then user should get a status code 200
        Then user deletes the book that was added
        Then user should get a status code 200
        Examples:
            | bookName              | available | genreId | genreName       | authorID | authorName | age | dateAdded  | dateAddedIso |
            | To Kill a Mockingbird | true      | 21      | Southern Gothic | 31       | Harper Lee | 45  | 1960-07-11 | 2015-01-01   |

    @regression @sanity @updateBook
    Scenario Outline: Update the book in the Library Information System
        When user adds a book with details "<bookName>", "<available>", <genreId>, "<genreName>", <authorID>, "<authorName>", <age>, "<dateAdded>", "<dateAddedIso>"
        Then user should get a status code 200
        Then user updates the book that was added "<updateAvailable>", <updateGenreId>, <updateAuthorID>
        Then user should get a status code 200
        Then user should see that book details "<bookName>", "<available>", <updateGenreId>, <updateAuthorID>, "<dateAddedIso>" are updated
        Examples:
            | bookName              | available | genreId | genreName       | authorID | authorName | age | dateAdded  | dateAddedIso | updateAvailable | updateGenreId | updateAuthorID |
            | To Kill a Mockingbird | true      | 21      | Southern Gothic | 31       | Harper Lee | 45  | 1960-07-11 | 2015-01-01   | false           | 50            | 70             |

    @regression @sanity @searchBook
    Scenario Outline: Search for books in Library Information System by providing date range
        When user adds a book with details "<bookName>", "<available>", <genreId>, "<genreName>", <authorID>, "<authorName>", <age>, "<dateAdded>", "<dateAddedIso>"
        Then user should get a status code 200
        Then user searches for books within date range "<startDateIso>" to "<endDateIso>"
        Then user should get a status code 200
            And user should see book in search result with details "<bookName>", "<available>", <genreId>, <authorID>, "<dateAddedIso>"
        Examples:
            | bookName            | available | genreId | genreName       | authorID | authorName    | age | dateAdded  | dateAddedIso | startDateIso | endDateIso |
            | Alice in Wonderland | false     | 51      | Fantasy Fiction | 19       | Lewis Carroll | 68  | 1865-11-01 | 1990-10-01   | 1990-10-01   | 1990-10-31 |
