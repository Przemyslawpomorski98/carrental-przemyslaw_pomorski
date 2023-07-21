Feature: Car rental

    As a user
    I want to rent a car according to the selected data

    Scenario: Valid car rental
        When Im on the main page
        Then I can search for the car providing correct data
        Then I can choose a car to rent
        Then I can finalize the order