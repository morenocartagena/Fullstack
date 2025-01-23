package com.siman.backend.repositories;

import com.siman.backend.entities.Venta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface IVentaDao extends JpaRepository<Venta, Long> {

    @Query("SELECT SUM(v.total) FROM Venta v WHERE v.fecha >= :startDate AND v.fecha <= :endDate")
    BigDecimal findIngresoMensual(@Param("startDate") LocalDateTime startDate, 
                                  @Param("endDate") LocalDateTime endDate);

    @Query("SELECT c, SUM(v.total) as totalIng FROM Venta v JOIN Cliente c ON v.clienteAsociado = c.id WHERE v.total IS NOT NULL AND v.total > 0 GROUP BY c ORDER BY totalIng DESC")
    List<Object[]> findClienteConMayorIngreso();
    
    @Query(value = "SELECT p.nombre AS producto_nombre, pc.producto_id, SUM(pc.cantidad) AS total_vendido FROM ProductosComprados pc JOIN Productos p ON pc.producto_id = p.id GROUP BY pc.producto_id, p.nombre ORDER BY total_vendido DESC LIMIT 3", nativeQuery = true)
    List<Object[]> findTop3ProductosMasVendidos();
}
