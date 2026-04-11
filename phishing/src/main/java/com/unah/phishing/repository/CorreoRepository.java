package com.unah.phishing.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.unah.phishing.entity.Correo;

import java.util.List;

public interface CorreoRepository extends JpaRepository<Correo, Long> {

    @Query(value = """
                SELECT *
                FROM CORREOS
                WHERE DIFICULTAD = :dificultad
                ORDER BY DBMS_RANDOM.VALUE
                FETCH FIRST :cantidad ROWS ONLY
            """, nativeQuery = true)
    List<Correo> obtenerCorreosAleatorios(Integer dificultad, Integer cantidad);

}
