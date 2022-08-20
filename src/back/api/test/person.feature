Feature: Person entity tests

Scenario: create a new person with correct data

Given url 'http://localhost:4051/api/person'
And request { first_name: 'Jean', last_name: 'Ballon' }
When method put
Then status 201
Given url 'http://localhost:4051/api/person/id'
And request { first_name: 'Jean', last_name: 'Ballon' }
When method get
Then status 200

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

Given url 'http://localhost:4051/api/person/2'
And request { first_name: 'Arthur', last_name: 'Clark' }
When method put
Then status 200

Scenario: update a person with incorrect id

Given url 'http://localhost:4051/api/person/999'
And request { first_name: 'Arthur', last_name: 'Clark' }
When method put
Then status 400
Then match response == 'Person not found'

Scenario: update a person with string id

Given url 'http://localhost:4051/api/person/abc'
And request { first_name: 'John', last_name: 'Doe' }
When method put
Then status 400
Then match response == 'Person id not a number'

Scenario: update a person with missing first name parameter

Given url 'http://localhost:4051/api/person/2'
And request { last_name: 'Clark' }
When method put
Then status 400
Then match response == 'Missing first name parameter'

Scenario: update a person with missing first name parameter

Given url 'http://localhost:4051/api/person/2'
And request { first_name: 'Arthur' }
When method put
Then status 400
Then match response == 'Missing last name parameter'

Scenario: create a person with JSON for first_name parameter

Given url 'http://localhost:4051/api/person/2'
And request { first_name: {}, last_name: 'Doe' }
When method put
Then status 400
Then match response == 'First name parameter not a string'

Scenario: create a person with JSON for last_name parameter

Given url 'http://localhost:4051/api/person/2'
And request { first_name: 'John', last_name: {} }
When method put
Then status 400
Then match response == 'Last name parameter not a string'

Scenario: get id of a person with correct data

Given url 'http://localhost:4051/api/person/id'
And request { first_name: 'Peter', last_name: 'Amilton' }
When method get
Then status 200
Then match response == { id: 3 }

Scenario: get id of a person with incorrect data

Given url 'http://localhost:4051/api/person/id'
And request { first_name: 'Peter', last_name: 'Hamilton' }
When method get
Then status 400
Then match response == "This person doesn't exist"

Scenario: update a person with missing first name parameter

Given url 'http://localhost:4051/api/person/id'
And request { last_name: 'Amilton' }
When method get
Then status 400
Then match response == 'Missing first name parameter'

Scenario: update a person with missing first name parameter

Given url 'http://localhost:4051/api/person/id'
And request { first_name: 'Peter' }
When method get
Then status 400
Then match response == 'Missing last name parameter'

Scenario: create a person with JSON for first_name parameter

Given url 'http://localhost:4051/api/person/id'
And request { first_name: {}, last_name: 'Amilton' }
When method get
Then status 400
Then match response == 'First name parameter not a string'

Scenario: create a person with JSON for last_name parameter

Given url 'http://localhost:4051/api/person/id'
And request { first_name: 'Peter', last_name: {} }
When method get
Then status 400
Then match response == 'Last name parameter not a string'