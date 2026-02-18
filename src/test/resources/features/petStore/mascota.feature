Feature: Creación y Consulta de mascota en PetStore

  Background:
    * url 'https://petstore.swagger.io/v2'
    * def pets = read('classpath:data/petData.json')
    * print pets
    * def petId = Math.floor(Math.random() * 10000)

  Scenario: Flujo completo de mascota
  # Crear mascota
    * def newPet = pets.newPet
    * set newPet.id = petId
    Given path 'pet'
    And request newPet
    When method post
    Then status 200
    * def createdId = response.id

  # Consultar mascota creada
    Given path 'pet', createdId
    When method get
    Then status 200
    And match response.id == createdId

  # Actualizar mascota
    * def updatedPet = pets.updatedPet
    * set updatedPet.id = createdId
    Given path 'pet'
    And request updatedPet
    When method put
    Then status 200
    And match response.status == 'sold'

  # Consultar por estado
    Given path 'pet', 'findByStatus'
    And param status = 'sold'
    When method get
    Then status 200
    And match response[*].status contains 'sold'

  # Consultar inexistente (negativo)
    Given path 'pet', 99999999
    When method get
    Then status 404

  # Crear inválida (negativo)
    * def invalidPet = pets.invalidPet
    Given path 'pet'
    And request invalidPet
    When method post
    Then status 500