package com.unah.phishing.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "DIFICULTAD_CORREOS")
@Data
public class DificultadCorreo {

    @Id
    @Column(name = "ID_DIFICULTAD")
    private Integer idDificultad;

    @Column(name = "DIFICULTAD")
    private String dificultad;

    @JsonIgnore()
    @OneToMany(mappedBy = "dificultad")
    private List<Correo> correos;

}
