package com.siman.backend.repositories;

import com.siman.backend.entities.Venta;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IProductoComprado extends JpaRepository<Venta, Long> {

    //List<Venta> findByEmail(String email);
    
}

