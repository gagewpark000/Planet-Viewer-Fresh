package com.techelevator.dao;

import com.techelevator.model.Planet;

import java.util.ArrayList;
import java.util.List;

public interface PlanetDao {
    List<Planet> getAllPlanets();
    Planet getPlanetById(int planetId);
    Planet createPlanet(Planet newPlanet);
    Planet updatePlanet(int planetId, Planet updatedPlanet);
    boolean deletePlanet(int planetId);
}
