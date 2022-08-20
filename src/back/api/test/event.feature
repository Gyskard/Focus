Feature: Person entity tests

Scenario: create a new event with correct data

Given url 'http://localhost:4051/api/event'
And request { title: 'a', description: 'b', localisation: 'Earth', date: '2022-01-03' }
When method put
Then status 201

Scenario: create a new event with correct date but without description

Given url 'http://localhost:4051/api/event'
And request { title: 'a', localisation: 'Earth', date: '2022-01-03' }
When method put
Then status 201

#Scenario: create a already existed event with correct data 

#Given url 'http://localhost:4051/api/event'
#And request { title: 'a', description: 'b', localisation: 'Earth', date: '2022-01-03' }
#When method put
#Then status 400
#Then match response == 'This event already exists'

#Scenario: create an event with missing title parameter

#Given url 'http://localhost:4051/api/event'
#And request { description: 'b', localisation: 'Earth', date: '2022-01-03' }
#When method put
#Then status 400
#Then match response == 'Missing title parameter'

#Scenario: create an event with missing localisation parameter

#Given url 'http://localhost:4051/api/event'
#And request { title: 'a', description: 'b', date: '2022-01-03' }
#When method put
#Then status 400
#Then match response == 'Missing localisation parameter'

#Scenario: create an event with missing date parameter

#Given url 'http://localhost:4051/api/event'
#And request { title: 'a', description: 'b', localisation: 'Earth' }
#When method put
#Then status 400
#Then match response == 'Missing date parameter'

#Scenario: create an event with JSON for title parameter

#Given url 'http://localhost:4051/api/event'
#And request { title: {}, description: 'b', localisation: 'Earth', date: '2022-01-03' }
#When method put
#Then status 400
#Then match response == 'Title parameter not a string'

#Scenario: create an event with JSON for description parameter

#Given url 'http://localhost:4051/api/event'
#And request { title: 'a', description: {}, localisation: 'Earth', date: '2022-01-03' }
#When method put
#Then status 400
#Then match response == 'Description parameter not a string'

#Scenario: create an event with JSON for localisation parameter

#Given url 'http://localhost:4051/api/event'
#And request { title: 'a', description: 'b', localisation: {}, date: '2022-01-03' }
#When method put
#Then status 400
#Then match response == 'Localisation parameter not a string'

#Scenario: create an event with JSON for date parameter

#Given url 'http://localhost:4051/api/event'
#And request { title: 'a', description: 'b', localisation: 'Earth', date: {} }
#When method put
#Then status 400
#Then match response == 'Localisation parameter not a string'

#Scenario: create an event with text as date

#Given url 'http://localhost:4051/api/event'
#And request { title: 'a', description: 'b', localisation: 'Earth', date: 'blabla' }
#When method put
#Then status 400
#Then match response == 'Date parameter is incorrect'

#Scenario: create an event with incorrect date format

#Given url 'http://localhost:4051/api/event'
#And request { title: 'a', description: 'b', localisation: 'Earth', date: '10-05-2010' }
#When method put
#Then status 400
#Then match response == 'Date parameter is incorrect'

#Scenario: create an event with incorrect date

#Given url 'http://localhost:4051/api/event'
#And request { title: 'a', description: 'b', localisation: 'Earth', date: '10-05-3050' }
#When method put
#Then status 400
#Then match response == 'Date parameter is incorrect'