Feature: Person entity tests

Scenario: create a new person with correct data

Given url 'http://localhost:4051/api/person'
And request { first_name: 'Jean', last_name: 'Ballon' }
When method put
Then status 201

Scenario: create a already existed person with correct data

Given url 'http://localhost:4051/api/person'
And request { first_name: 'John', last_name: 'Doe' }
When method put
Then status 400
Then match response == 'Person already exists'