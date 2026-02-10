package com.pruebas.tasks;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;
import net.serenitybdd.screenplay.questions.Text;
import static net.serenitybdd.screenplay.Tasks.instrumented;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

public class FinalizarCompra implements Task {

    private final String mensajeEsperado;

    public FinalizarCompra(String mensajeEsperado) {
        this.mensajeEsperado = mensajeEsperado;
    }

    public static FinalizarCompra conConfirmacion(String mensajeEsperado) {
        return instrumented(FinalizarCompra.class, mensajeEsperado);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Click.on(Target.the("botón finalizar").located(By.id("finish")))
        );

        String mensaje = Text.of(Target.the("mensaje de confirmación")
                .located(By.className("complete-header"))).answeredBy(actor);

        assertThat(mensaje, equalTo(mensajeEsperado));
    }
}