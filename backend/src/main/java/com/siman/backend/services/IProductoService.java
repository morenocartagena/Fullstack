package com.siman.backend.services;

import com.siman.backend.entities.Producto;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.*;

public interface IProductoService {
    
    Page<Producto> findAll(Pageable pageable);
    
    Optional<Producto> findById(Long id);
    
    Producto save(Producto producto);
    
    void deleteById(Long id);
}
