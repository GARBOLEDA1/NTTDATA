Feature: Prueba PetStore con Karate

  Background:
    * url 'https://petstore.swagger.io/v2'
    * def petId = 9223372036854775807

  Scenario: Añadir una mascota
    Given url+'pet'
    And request { id: petId, name: 'Firulais', status: 'available' }
    When method post
    Then status 200
    And match response.name == 'firulais'

  Scenario: Consultar mascota por ID
    Given url´+'pet', petId
    When method get
    Then status 200
    And match response.id == petId

  Scenario: Actualizar mascota
    Given url+ 'pet'
    And request { id: petId, name: 'Max', status: 'sold' }
    When method put
    Then status 200
    And match response.status == 'sold'

  Scenario: Consultar mascota por estatus
    Given url+'pet', 'findByStatus'
    And param status = 'sold'
    When method get
    Then status 200
    And match response[*].status contains 'sold'