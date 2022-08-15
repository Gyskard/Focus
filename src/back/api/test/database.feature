Feature: API test

Scenario: all interactions with database

# Create a new person with correct data

Given url 'http://localhost:4001/api/person'
And request { first_name: 'John', last_name: 'Doe' }
When method put
Then status 201