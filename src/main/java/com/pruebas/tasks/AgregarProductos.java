package com.pruebas.tasks;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;
import static net.serenitybdd.screenplay.Tasks.instrumented;

public class AgregarProductos implements Task {

    public static AgregarProductos alCarrito() {
        return instrumented(AgregarProductos.class);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Click.on(Target.the("sauceLabsBackpack").located(By.id("add-to-cart-sauce-labs-backpack"))),
                Click.on(Target.the("sauceLabsBikeLight").located(By.id("add-to-cart-sauce-labs-bike-light")))
        );
    }
}