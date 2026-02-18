# Ejercicio de APIS

## Pre-requisitos

1. Gradle y tener agregado en el path de la variable de entorno
2. IDE IntelliJ IDEA
3. Java 17
4. Ejecutar escenario mascota.future

Saludos Galo Arboleda

## Complementos

> **NOTA**:
> * Una vez obtenido Intellij es necesario instalar los plugins de Gherkin y Cucumber. (*[Guia de instalación plugins en intellij](https://www.jetbrains.com/help/idea/managing-plugins.html)*)
>

## Ejecución local

Clonar el proyecto

```bash
  git clone https://github.com/GARBOLEDA1/NTTDATA.git
```
Entrar al directorio del proyecto

```bash
  cd karate-gradle
```
## Comandos

Para decargar todas las dependencias y no ejecutar los test
```bash
  gradle clean build -x test 
```

Para ejecutar el escenario:

Dirijase al path :
```bash
src\test\java\features\petStore-karate\
```
En el archivo **mascota.feature** Presionar Click derecho y ejecutar la opcion > Run 'Feature: mascota'


## Reporte
Luego de la ejecución, para abrir el reporte dirigirse abrir el archivo **karate-summary.html** que se encuentra en el siguiente path:
```bash
EvalKarateNttdata\target\karate-reports\karate-summary.html
```


> **NOTA**:
> * Para ejecutar el proyecto se necesita Java JDK 11 y Gradle con la versión 7.6 o superior.
> * Para poder instalar gradle en windows podemos seguir el siguiente tutorial https://www.geeksforgeeks.org/how-to-install-gradle-on-windows/.
> * Luego de la ejecucion de pruebas, los reportes se generan en la carpeta **build/karate-reports/**, y el archivo de resumen es el **karate-summary.html**

## Construido con:
La automatización fue desarrollada con:

* BDD - Estrategia de desarrollo
* Gradle - Manejador de dependencias
* Gherkin - Lenguaje Business Readable DSL (Lenguaje especifico de dominio legible por el negocio)

## Documentacion

[Karate DSL](https://github.com/karatelabs/karate)

