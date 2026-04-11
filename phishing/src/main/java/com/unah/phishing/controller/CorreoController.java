package com.unah.phishing.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.unah.phishing.entity.Correo;
import com.unah.phishing.service.CorreoService;


@RestController
@RequestMapping("api/correos")
@CrossOrigin("*")
public class CorreoController {

    @Autowired
    public CorreoService correoService;

    @GetMapping("/obtener-correos")
    public List<Correo> obtenerCorreos(@RequestParam Integer dificultad, @RequestParam int cantidad) {
        return correoService.obtenerCorreos(dificultad, cantidad);
    }
    


}
