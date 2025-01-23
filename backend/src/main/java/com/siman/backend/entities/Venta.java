package com.siman.backend.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import lombok.Data;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "Ventas")
@Data
public class Venta implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime fecha;

    @Column(name = "cliente_asociado", nullable = false)
    private Integer clienteAsociado;

    @Column(nullable = false)
    private BigDecimal total;

    @OneToMany
    @JoinColumn(name = "venta_id", referencedColumnName = "id")
    private List<ProductoComprado> productosComprados;
    
    // Lombok se encarga de generar los getters, setters, constructores, etc.
}



