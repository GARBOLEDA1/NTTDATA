package com.pruebas.glue;

import com.pruebas.tasks.*;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.abilities.BrowseTheWeb;
import org.openqa.selenium.WebDriver;

public class CompraStepdefinition {

    Actor cliente = Actor.named("Cliente");

    @Given("que el usuario se autentica en SauceDemo con usuario {string} y password {string}")
    public void autenticar(String usuario, String password) {
        cliente.can(BrowseTheWeb.with(net.serenitybdd.core.Serenity.getDriver()));
        cliente.attemptsTo(Autenticarse.conCredenciales(usuario, password));
    }

    @When("agrega dos productos al carrito")
    public void agregarProductos() {
        cliente.attemptsTo(AgregarProductos.alCarrito());
    }

    @When("visualiza el carrito")
    public void visualizarCarrito() {
        cliente.attemptsTo(VisualizarCarrito.enPantalla());
    }

    @When("completa el formulario de compra con nombre {string}, apellido {string} y código postal {string}")
    public void completarFormulario(String nombre, String apellido, String codigoPostal) {
        cliente.attemptsTo(CompletarFormulario.conDatos(nombre, apellido, codigoPostal));
    }

    @Then("finaliza la compra y ve el mensaje {string}")
    public void finalizarCompra(String mensaje) {
        cliente.attemptsTo(FinalizarCompra.conConfirmacion(mensaje));
    }
}
