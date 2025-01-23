package com.siman.backend.repositories;

import com.siman.backend.entities.ERole;
import com.siman.backend.entities.Role;
import com.siman.backend.entities.User;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
