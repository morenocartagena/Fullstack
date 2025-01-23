package com.siman.backend.services;

import com.siman.backend.dto.ClienteConIngresoDto;
import com.siman.backend.dto.IngresoMensualDto;
import java.util.List;

public interface IVentaService {
    
    ClienteConIngresoDto obtenerClienteConMayorIngreso();
    
    IngresoMensualDto obtenerIngresoMensual();
    
    List<Object[]> obtenerTop3ProductosMasVendidos();

}
