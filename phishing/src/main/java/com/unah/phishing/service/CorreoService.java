package com.unah.phishing.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unah.phishing.entity.Correo;
import com.unah.phishing.repository.CorreoRepository;

@Service
public class CorreoService {
    
    @Autowired 
    private CorreoRepository correoRepository;

    public List<Correo> obtenerCorreos(Integer dificultad, int cantidad) {

        List<Correo> correos = correoRepository.obtenerCorreosAleatorios(dificultad, cantidad);
        return correos;
    }

}
