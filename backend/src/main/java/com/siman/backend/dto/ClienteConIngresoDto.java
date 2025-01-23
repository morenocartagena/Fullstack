package com.siman.backend.dto;

import com.siman.backend.entities.Cliente;

public class ClienteConIngresoDto {
    private Cliente cliente;
    private Double totalIngreso;

    public ClienteConIngresoDto(Cliente cliente, Double totalIngreso) {
        this.cliente = cliente;
        this.totalIngreso = totalIngreso;
    }

    // Getters y Setters
    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Double getTotalIngreso() {
        return totalIngreso;
    }

    public void setTotalIngreso(Double totalIngreso) {
        this.totalIngreso = totalIngreso;
    }
}
