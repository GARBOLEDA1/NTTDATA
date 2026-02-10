package com.pruebas.ui;

import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

import static net.serenitybdd.screenplay.targets.Target.the;

public class PaginaProductos extends PageObject {

    public static final Target BUTTON_ADD_TO_CART = Target.the("botón para añadir al carrito el producto")
            .locatedBy("//a[@class='btn btn-success btn-lg']");
    public static final Target LABEL_SAMSUNG = the("Label Telefono").locatedBy("//*[@id=\"tbodyid\"]/div[1]/div/div/h4/a");
    public static final Target LABEL_DESCRIPCION = the("Label Descripcion").locatedBy("//*[@id=\"more-information\"]/strong");
}

