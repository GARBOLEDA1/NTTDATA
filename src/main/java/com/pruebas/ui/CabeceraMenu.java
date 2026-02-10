package com.pruebas.ui;

import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;

public class CabeceraMenu extends PageObject {
    public static final Target MENU_CART = Target.the("Menú Carrito de compras").locatedBy("//a[@id='cartur']");
}