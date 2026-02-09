Feature: Prueba PetStore con Karate

  Background:
    * url url
    * def petId = '9223372036854775807'

  Scenario: Añadir una mascota
    Given path 'pet'
    And request { id: petId, name: 'Firulais', status: 'available' }
    When method post
    Then status 200
    And match response.name == 'Firulais'

  Scenario: Consultar mascota por ID
    Given path 'pet', petId
    When method get
    Then status 200
    And match response.id == petId

  Scenario: Actualizar mascota
    Given path 'pet'
    And request { id: petId, name: 'Max', status: 'sold' }
    When method put
    Then status 200
    And match response.status == 'sold'

  Scenario: Consultar mascota por estatus
    Given path 'pet', 'findByStatus'
    And param status = 'sold'
    When method get
    Then status 200
    And match response[*].status contains 'sold'