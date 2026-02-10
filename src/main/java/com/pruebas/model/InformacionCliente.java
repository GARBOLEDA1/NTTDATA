package com.pruebas.model;

public class InformacionCliente {
    private static Cliente cliente = new Cliente();

    private InformacionCliente() {
    }

    public static Cliente conDatos(String nombre, String pais, String ciudad, String numeroTarjeta,
            String mesVencimiento, String anioVencimiento) {
        cliente.setNombre(nombre);
        cliente.setPais(pais);
        cliente.setCiudad(ciudad);
        cliente.setNumeroTarjeta(numeroTarjeta);
        cliente.setMesVencimiento(mesVencimiento);
        cliente.setMesVencimiento(anioVencimiento);
        return cliente;
    }
}