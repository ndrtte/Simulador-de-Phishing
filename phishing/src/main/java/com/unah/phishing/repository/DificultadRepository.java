package com.unah.phishing.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unah.phishing.entity.DificultadCorreo;

public interface DificultadRepository extends JpaRepository<DificultadCorreo, Integer>{
    
    

}
