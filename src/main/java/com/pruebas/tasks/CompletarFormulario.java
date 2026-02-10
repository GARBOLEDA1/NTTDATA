package com.pruebas.tasks;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Enter;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;
import static net.serenitybdd.screenplay.Tasks.instrumented;

public class CompletarFormulario implements Task {

    private final String nombre;
    private final String apellido;
    private final String codigoPostal;

    public CompletarFormulario(String nombre, String apellido, String codigoPostal) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.codigoPostal = codigoPostal;
    }

    public static CompletarFormulario conDatos(String nombre, String apellido, String codigoPostal) {
        return instrumented(CompletarFormulario.class, nombre, apellido, codigoPostal);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Click.on(Target.the("botón checkout").located(By.id("checkout"))),
                Enter.theValue(nombre).into(Target.the("campo nombre").located(By.id("first-name"))),
                Enter.theValue(apellido).into(Target.the("campo apellido").located(By.id("last-name"))),
                Enter.theValue(codigoPostal).into(Target.the("campo código postal").located(By.id("postal-code"))),
                Click.on(Target.the("botón continue").located(By.id("continue")))
        );
    }
}