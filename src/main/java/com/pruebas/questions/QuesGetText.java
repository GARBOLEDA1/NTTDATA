package com.pruebas.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.targets.Target;

public class QuesGetText implements Question<String> {

    private final Target target;

    public QuesGetText(Target target) {
        this.target = target;
    }

    public static QuesGetText getText(Target target) {
        return new QuesGetText(target);
    }

    @Override
    public String answeredBy(Actor actor) {
        return target.resolveFor(actor).getText();
    }
}
