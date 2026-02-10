package com.pruebas.ui;

import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;
import net.serenitybdd.annotations.DefaultUrl;
import org.openqa.selenium.By;

import static net.serenitybdd.screenplay.targets.Target.*;

@DefaultUrl("page:webdriver.base.url.demoblaze")
public class PaginaPrincipal extends PageObject {
    public static final Target SELECT_TYPE_PRODUCT = the("Botón de tipo de producto").located(By.xpath("//a[contains(text(),'Phones')]"));
    public static final Target SELECTED_PRODUCT = the("Link de producto encontrado").locatedBy("//a[contains(text(),'{0}')]");
    public static final Target BUTTON_REGISTRE = the("Link de para registrarse").located(By.id("signin2"));
    public static final Target TXT_USER = the("Txt de usuario").located(By.id("sign-username"));
    public static final Target TXT_PASS = the("Txt de pass").located(By.id("sign-password"));
    public static final Target BUTTON_REGISTREUSER = the("Boton para registrar al usuario").locatedBy("//*[@id=\"signInModal\"]/div/div/div[3]/button[2]");
    public static final Target BUTTON_LOGIN = the("Btn para logearse").located(By.id("login2"));
    public static final Target TXT_LOGIN_USUARIO = the("Txt de user login").located(By.id("loginusername"));
    public static final Target TXT_LOGIN_PASS = the("Txt de user pass").located(By.id("loginpassword"));
    public static final Target BUTTON_INGRESAR = the("Btn para inrgesar al sistema").locatedBy("//*[@id=\"logInModal\"]/div/div/div[3]/button[2]");
    public static final Target LABEL_USER = the("Label User").located(By.id("nameofuser"));
}