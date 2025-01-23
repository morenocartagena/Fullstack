package com.siman.backend.dto;

public class IngresoMensualDto {
    private Double totalIngresoMensual;

    public IngresoMensualDto(Double totalIngresoMensual) {
        this.totalIngresoMensual = totalIngresoMensual;
    }

    // Getters y Setters
    public Double getTotalIngresoMensual() {
        return totalIngresoMensual;
    }

    public void setTotalIngresoMensual(Double totalIngresoMensual) {
        this.totalIngresoMensual = totalIngresoMensual;
    }
}
