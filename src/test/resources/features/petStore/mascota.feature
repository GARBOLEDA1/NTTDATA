Feature: CRUD de mascota en PetStore

  Background:
    * url url
    * def petId = Math.floor(Math.random() * 10000)

  Scenario: Crear, consultar y actualizar mascota
    Given path 'pet'
    And request
    """
    {
      "id": #(petId),
      "category": { "id": 0, "name": "string" },
      "name": "Firulais",
      "photoUrls": [ "string" ],
      "tags": [ { "id": 0, "name": "string" } ],
      "status": "available"
    }
    """
    When method post
    Then status 200
    * def createdId = response.id

    Given path 'pet', createdId
    When method get
    Then status 200
    And match response.id == createdId

    Given path 'pet'
    And request
    """
    {
      "id": #(createdId),
      "category": { "id": 0, "name": "string" },
      "name": "Max",
      "photoUrls": [ "string" ],
      "tags": [ { "id": 0, "name": "string" } ],
      "status": "sold"
    }
    """
    When method put
    Then status 200
    And match response.status == 'sold'

    Given path 'pet', 'findByStatus'
    And param status = 'sold'
    When method get
    Then status 200
    And match response[*].status contains 'sold'