package com.pruebas.tasks;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Open;
import net.serenitybdd.screenplay.actions.Enter;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

import static net.serenitybdd.screenplay.Tasks.instrumented;

public class Autenticarse implements Task {

    private final String username;
    private final String password;

    public Autenticarse(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public static Autenticarse conCredenciales(String username, String password) {
        return instrumented(Autenticarse.class, username, password);
    }

    // 👇 Target para el botón de cierre del pop-up
    private static final Target POPUP_CLOSE = Target.the("botón cerrar popup")
            .located(By.cssSelector(".close-button")); // ajusta el selector real

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                // Abrir la página de SauceDemo
                Open.url("https://www.saucedemo.com/"),

                // Ingresar username
                Enter.theValue(username).into(Target.the("campo username")
                        .located(By.id("user-name"))),

                // Ingresar password
                Enter.theValue(password).into(Target.the("campo password")
                        .located(By.id("password"))),

                // Click en login
                Click.on(Target.the("botón login")
                        .located(By.id("login-button")))
        );

        // 👇 Nuevo paso: cerrar pop-up si aparece
        if (POPUP_CLOSE.resolveFor(actor).isVisible()) {
            actor.attemptsTo(Click.on(POPUP_CLOSE));
        }
    }
}
