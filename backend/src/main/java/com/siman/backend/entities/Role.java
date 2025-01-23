package com.siman.backend.entities;

import java.io.Serializable;
import java.util.Set;
import lombok.Data;
import javax.persistence.*;

@Entity
@Table(name = "roles") 
@Data
public class Role {

    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ERole name;

    // Getters y Setters
}
