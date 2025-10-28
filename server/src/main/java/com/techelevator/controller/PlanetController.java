package com.techelevator.controller;

import com.techelevator.dao.PlanetDao;
import com.techelevator.model.Planet;
import jakarta.annotation.security.PermitAll;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/planets")
public class PlanetController {

    private final PlanetDao planetDao;

    public PlanetController(PlanetDao planetDao) {
        this.planetDao = planetDao;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'Creator')")
    @GetMapping("/{id}")
    public Planet getPlanetById(@PathVariable int id) {
        return planetDao.getPlanetById(id);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public Planet createPlanet(@RequestBody Planet planet) {
        return planetDao.createPlanet(planet);
    }

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/{id}")
    public boolean deletePlanet(@PathVariable int id) {
        return planetDao.deletePlanet(id);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/{id}")
    public Planet updatePlanet(@PathVariable int id, @RequestBody Planet updatedPlanet) {
        return planetDao.updatePlanet(id, updatedPlanet);
    }

    @PermitAll
    @GetMapping
    public List<Planet> getAllPlanets() {
        return planetDao.getAllPlanets();
    }
}
