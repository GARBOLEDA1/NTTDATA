package com.pruebas.ui;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class CarritoCompra {
    private CarritoCompra() {
    }

    public static final Target ELEMENT_CART = Target.the("'El producto {0}'")
            .locatedBy("//*[@id='tbodyid']/tr[//td[.='{0}']]");
    public static final Target NAME = Target.the("'Nombre de Cliente'").located(By.id("name"));
    public static final Target COUNTRY = Target.the("'Pais de la tarjeta'").located(By.id("country"));
    public static final Target CITY = Target.the("'Ciudad de la tarjeta'").located(By.id("city"));
    public static final Target CREDIT_CARD = Target.the("'Numero de Tarjeta'").located(By.id("card"));
    public static final Target MONTH = Target.the("'Mes de vencimiento'").located(By.id("month"));
    public static final Target YEAR = Target.the("'Año de vencimiento'").located(By.id("year"));
    public static final Target PLACE_ORDER = Target.the("'Botón de Compra'")
            .locatedBy("//button[text()='Place Order']");
    public static final Target PURCHASE = Target.the("'Botón de realizar Compra'")
            .locatedBy("//button[text()='Purchase']");
    public static final Target SUCCESSFULL_PURCHASE = Target.the("'Compra exitosa'")
            .locatedBy("//*[.='Thank you for your purchase!']");
    public static final Target LABEL_PRODUCTO = Target.the("'label producto'")
            .locatedBy("//*[@id=\"tbodyid\"]/tr/td[2]");
    public static final Target BTN_ELIMINARPRODUCTO = Target.the("'btn eliminar producto'")
            .locatedBy("//*[@id=\"tbodyid\"]/tr/td[4]/a");
}

