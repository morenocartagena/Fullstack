package com.siman.backend.repositories;

import com.siman.backend.entities.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IClienteDao extends JpaRepository<Cliente,Long> {
}
