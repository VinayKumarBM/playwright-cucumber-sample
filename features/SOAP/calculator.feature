@soap @calculator
Feature: Scenarios related to Calculator SOAP service

    @regression @sanity @add @ignore
    Scenario Outline: Verify ADD SOAP service
        When user adds two numbers <number1> and <number2> in the calculator
        Then user should get a status code 200
        Then user should get the result of addition as "<result>"
        Examples:
            | number1 | number2 | result |
            | 10      | 20      | 30     |
            | 23      | 32      | 55     |

    @regression @sanity @subtract
    Scenario Outline: Verify SUBTRACT SOAP service
        When user subtracts two numbers <number1> and <number2> in the calculator
        Then user should get a status code 200
        Then user should get the result of subtraction as "<result>"
        Examples:
            | number1 | number2 | result |
            | 100     | 20      | 80     |
            | 135     | 32      | 103    |

    @regression @sanity @multiply
    Scenario Outline: Verify MULTIPLY SOAP service
        When user multiplies two numbers <number1> and <number2> in the calculator
        Then user should get a status code 200
        Then user should get the result of multiplication as "<result>"
        Examples:
            | number1 | number2 | result |
            | 10      | 20      | 200    |
            | 2       | 32      | 64     |

    @regression @sanity @divide
    Scenario Outline: Verify DIVIDE SOAP service
        When user divides two numbers <number1> and <number2> in the calculator
        Then user should get a status code 200
        Then user should get the result of division as "<result>"
        Examples:
            | number1 | number2 | result |
            | 100     | 20      | 5      |
            | 21      | 3       | 7      |
