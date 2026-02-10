Feature: Flujo de compra en SauceDemo

  @SauceDemo
  Scenario Outline: Comprar dos productos exitosamente
    Given que el usuario se autentica en SauceDemo con usuario "<username>" y password "<password>"
    When agrega dos productos al carrito
    And visualiza el carrito
    And completa el formulario de compra con nombre "<nombre>", apellido "<apellido>" y código postal "<codigoPostal>"
    Then finaliza la compra y ve el mensaje "Thank you for your order!"

    Examples:
      | username       | password      | nombre   | apellido  | codigoPostal |
      | standard_user | secret_sauce  | Armando  | Arboleda  | 170123       |
