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

Scenario: create a person with missing first_name parameter

Given url 'http://localhost:4051/api/person'
And request { last_name: 'Doe' }
When method put
Then status 400
Then match response == 'Missing first name parameter'

Scenario: create a person with missing last_name parameter

Given url 'http://localhost:4051/api/person'
And request { first_name: 'John' }
When method put
Then status 400
Then match response == 'Missing last name parameter'

Scenario: create a person with JSON for first_name parameter

Given url 'http://localhost:4051/api/person'
And request { first_name: {}, last_name: 'Doe' }
When method put
Then status 400
Then match response == 'First name parameter not a string'

Scenario: create a person with JSON for last_name parameter

Given url 'http://localhost:4051/api/person'
And request { first_name: 'John', last_name: {} }
When method put
Then status 400
Then match response == 'Last name parameter not a string'