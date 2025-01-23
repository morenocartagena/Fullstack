package com.siman.backend.services;

import com.siman.backend.entities.Cliente;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IClienteService {
    
    Page<Cliente> findAll(Pageable pageable);
    
    Optional<Cliente> findById(Long id);
    
    //Cliente save(Cliente cliente);
    
    // void deleteById(Long id);
}
