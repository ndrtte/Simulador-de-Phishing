package com.unah.phishing.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "CORREOS", schema = "PHISHING_DB_OWNER")
@Data
public class Correo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_CORREO")
    private Long idCorreo;

    @Column(name = "NOMBRE_REMITENTE")
    private String nombreRemitente;

    @Column(name = "CORREO_REMITENTE")
    private String correoRemitente;

    @Column(name = "ASUNTO")
    private String asunto;

    @Column(name = "ES_PHISHING")
    private Integer esPhishing;

    @Lob
    @Column(name = "CUERPO_CORREO")
    private String cuerpoCorreo;

    @ManyToOne
    @JoinColumn(name = "DIFICULTAD")
    private DificultadCorreo dificultad;
}
