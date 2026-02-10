package com.pruebas.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Cliente {
    private String nombre;
    private String ciudad;
    private String pais;
    private String numeroTarjeta;
    private String mesVencimiento;
    private String anioVencimiento;

    public Cliente(String nombre, String ciudad, String pais, String numeroTarjeta, String mesVencimiento,
            String anioVencimiento) {
        this.nombre = nombre;
        this.ciudad = ciudad;
        this.pais = pais;
        this.numeroTarjeta = numeroTarjeta;
        this.mesVencimiento = mesVencimiento;
        this.anioVencimiento = anioVencimiento;
    }
}