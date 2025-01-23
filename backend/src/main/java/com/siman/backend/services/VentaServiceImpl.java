package com.siman.backend.services;

import com.siman.backend.dto.ClienteConIngresoDto;
import com.siman.backend.dto.IngresoMensualDto;
import com.siman.backend.entities.Cliente;
import com.siman.backend.repositories.IVentaDao;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VentaServiceImpl implements IVentaService {

    @Autowired
    private IVentaDao ventaDao;

    @Override
    public ClienteConIngresoDto obtenerClienteConMayorIngreso() {
        List<Object[]> resultados = ventaDao.findClienteConMayorIngreso();
        if (!resultados.isEmpty()) {
            Object[] resultado = resultados.get(0);
            Cliente cliente = (Cliente) resultado[0];
            BigDecimal totalIngreso = (BigDecimal) resultado[1];
            return new ClienteConIngresoDto(cliente, totalIngreso != null ? totalIngreso.doubleValue() : 0.0);
        }
        return null;
    }

    @Override
    public IngresoMensualDto obtenerIngresoMensual() {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusMonths(1);

        LocalDateTime startDateConverted = startDate.atStartOfDay();
        LocalDateTime endDateConverted = endDate.atTime(23, 59, 59); // Asegúrate de incluir todo el día

        BigDecimal ingresoMensual = ventaDao.findIngresoMensual(startDateConverted, endDateConverted);
        return new IngresoMensualDto(ingresoMensual != null ? ingresoMensual.doubleValue() : 0.0);
    }
    
    @Override
    public List<Object[]> obtenerTop3ProductosMasVendidos() {
        return ventaDao.findTop3ProductosMasVendidos();
    }
}
