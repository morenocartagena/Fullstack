package com.siman.backend.services;

import com.siman.backend.entities.Cliente;
import com.siman.backend.repositories.IClienteDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.*;

@Service
public class ClienteServiceImpl implements IClienteService {

    @Autowired
    private IClienteDao clienteDao;

    @Override
    public Page<Cliente> findAll(Pageable pageable) {
        return clienteDao.findAll(pageable);
    }

    @Override
    public Optional<Cliente> findById(Long id) {
        return clienteDao.findById(id);
    }

    /*@Override
    public Cliente save(Cliente cliente) {
        return clienteDao.save(cliente);
    }*/

 /*@Override
    public void deleteById(Long id) {
        clienteDao.deleteById(id);
    }*/
}
