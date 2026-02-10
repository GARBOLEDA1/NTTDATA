package com.pruebas.tasks;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

import static net.serenitybdd.screenplay.Tasks.instrumented;

public class VisualizarCarrito implements Task {

    public static VisualizarCarrito enPantalla() {
        return instrumented(VisualizarCarrito.class);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Click.on(Target.the("icono carrito").located(By.className("shopping_cart_link")))
        );
    }
}