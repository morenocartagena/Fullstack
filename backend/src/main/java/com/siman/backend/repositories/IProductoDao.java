package com.siman.backend.repositories;

import com.siman.backend.entities.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductoDao extends JpaRepository<Producto, Long> {
}
