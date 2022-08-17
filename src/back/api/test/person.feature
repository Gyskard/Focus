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
Then match response == 'This person already exists'

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

Scenario: update a person with correct data

Given url 'http://localhost:4051/api/person/Isaac+Asimov'
And request { new_first_name: 'Arthur', new_last_name: 'Clark' }
When method put
Then status 200

Given url 'http://localhost:4051/api/person'
And request { first_name: 'Arthur', last_name: 'Clark' }
When method put
Then status 400
Then match response == 'This person already exists'

Scenario: update a person with missing first_name parameter

Given url 'http://localhost:4051/api/person/John+Doe'
And request { new_last_name: 'Doe' }
When method put
Then status 400
Then match response == 'Missing new first name parameter'

Scenario: update a person with missing last_name parameter

Given url 'http://localhost:4051/api/person/John+Doe'
And request { new_first_name: 'John' }
When method put
Then status 400
Then match response == 'Missing new last name parameter'

Scenario: update a person with JSON for first_name parameter

Given url 'http://localhost:4051/api/person/John+Doe'
And request { new_first_name: {}, new_last_name: 'Doe' }
When method put
Then status 400
Then match response == 'New first name parameter not a string'

Scenario: update a person with JSON for last_name parameter

Given url 'http://localhost:4051/api/person/John+Doe'
And request { new_first_name: 'John', new_last_name: {} }
When method put
Then status 400
Then match response == 'New last name parameter not a string'

Scenario: update a person with no first part of query string

Given url 'http://localhost:4051/api/person/John+'
And request { new_first_name: 'John', new_last_name: 'Doe' }
When method put
Then status 400
Then match response == 'Missing last name parameter'

Scenario: update a person with no second part of query string

Given url 'http://localhost:4051/api/person/+Doe'
And request { new_first_name: 'John', new_last_name: 'Doe' }
When method put
Then status 400
Then match response == 'Missing first name parameter'

Scenario: update a person with no second part of query string

Given url 'http://localhost:4051/api/person/JohnDoe'
And request { new_first_name: 'John', new_last_name: 'Doe' }
When method put
Then status 400
Then match response == 'Name parameter is incorrect'