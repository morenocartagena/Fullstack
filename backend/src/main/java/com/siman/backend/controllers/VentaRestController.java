package com.siman.backend.controllers;

import com.siman.backend.dto.ClienteConIngresoDto;
import com.siman.backend.dto.IngresoMensualDto;
import com.siman.backend.services.IVentaService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ventas")
public class VentaRestController {

    @Autowired
    private IVentaService ventaService;

    @GetMapping("/cliente-mayor-ingreso")
    public ResponseEntity<ClienteConIngresoDto> obtenerClienteConMayorIngreso() {
        ClienteConIngresoDto clienteConIngresoDto = ventaService.obtenerClienteConMayorIngreso();
        if (clienteConIngresoDto != null) {
            return ResponseEntity.ok(clienteConIngresoDto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    
    @GetMapping("/ingreso-mensual")
    public ResponseEntity<IngresoMensualDto> obtenerIngresoMensual() {
        IngresoMensualDto ingresoMensualDto = ventaService.obtenerIngresoMensual();
        return ResponseEntity.ok(ingresoMensualDto);
    }
    
    @GetMapping("/productos-mas-vendidos")
    public ResponseEntity<List<Map<String, Object>>> obtenerTop3ProductosMasVendidos() {
        List<Object[]> productosMasVendidos = ventaService.obtenerTop3ProductosMasVendidos();
        List<Map<String, Object>> response = new ArrayList<>();

        for (Object[] producto : productosMasVendidos) {
            Map<String, Object> productoMap = new HashMap<>();
            productoMap.put("producto_nombre", producto[0]);
            productoMap.put("producto_id", producto[1]);
            productoMap.put("total_vendido", producto[2]);
            response.add(productoMap);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
