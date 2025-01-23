package com.siman.backend.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import lombok.Data;
import javax.persistence.*;

@Entity
@Table(name = "ProductosComprados")
@Data
public class ProductoComprado implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "venta_id", nullable = false)
    private Long ventaId;

    @Column(name = "producto_id", nullable = false)
    private Long productoId;

    @Column(name = "cantidad", nullable = false)
    private int cantidad;

    @Column(name = "subtotal", nullable = false)
    private BigDecimal subtotal;

    @ManyToOne
    @JoinColumn(name = "venta_id", insertable = false, updatable = false)
    private Venta venta;

    // Lombok se encarga de generar los getters, setters, constructores, etc.
}
