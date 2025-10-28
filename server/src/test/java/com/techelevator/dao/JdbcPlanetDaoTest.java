package com.techelevator.dao;

import com.techelevator.model.Planet;
import com.techelevator.model.User;
import jakarta.validation.constraints.AssertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

import static com.techelevator.dao.JdbcUserDaoTest.USER_1;
import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;


public class JdbcPlanetDaoTest extends BaseDaoTest {

    protected static final Planet PLANET_1 = new Planet(1, "Saturn", "Saturn is the sixth planet from the Sun", 11);
    protected static final Planet PLANET_2 = new Planet(2, "Venus", "Venus is the second planet from the Sun ", 22);
    private static final Planet PLANET_3 = new Planet(3, "Neptune", "Neptune is the eighth and farthest planet from the Sun", 33);

    private JdbcPlanetDao dao;

    @BeforeEach
    public void setup() {
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        dao = new JdbcPlanetDao(jdbcTemplate);
    }

    @Test
    public void getPlanetById_given_invalid_id_returns_null() {
        Planet planet = dao.getPlanetById(-1);
        assertNull(planet, "Expected null when getting planet with an invalid id");
    }

    @Test
    public void getPlanetById_given_valid_id_returns_planet() {
        Planet planet = dao.getPlanetById(1);
        assertNotNull(planet, "Expected planet when getting planet with a valid id");

    }

    @Test
    public void getAllPlanets_returns_all_planets() {
        List<Planet> planets = dao.getAllPlanets();

        assertNotNull(planets, "getAllPlanets returned a null list of planets");
        assertEquals(3, planets.size(), "getAllPlanets returned a list with the incorrect number of planets");
        assertEquals(PLANET_1, planets.get(0), "getAllPlanets returned a list in incorrect order");
        assertEquals(PLANET_2, planets.get(1), "getAllPlanets returned a list in incorrect order");
        assertEquals(PLANET_3, planets.get(2), "getAllPlanets returned a list in incorrect order");
    }

    @Test
    public void createPlanet_creates_a_planet() {
        Planet newPlanet = new Planet(3, "new", "planet", 2);

        Planet planet = dao.createPlanet(newPlanet);
        assertNotNull(planet, "Call to create should return non-null planet");

        Planet actualPlanet = dao.getPlanetById(planet.getPlanetId());
        assertNotNull(actualPlanet, "Call to getPlanetById after call to create should return non-null planet");

        newPlanet.setPlanetId(actualPlanet.getPlanetId());
        assertEquals(newPlanet, actualPlanet);
    }

    @Test
    public void deletePlanet_deletes_a_planet() {
        Planet newPlanet = new Planet(5, "PlanetToDelete", "This planet is about to be deleted!", 55);
        Planet createdPlanet = dao.createPlanet(newPlanet);

        boolean deleted = dao.deletePlanet(createdPlanet.getPlanetId());
        assertTrue(deleted, "DeletePlanet should return true when the planet is deleted.");

        Planet checkIfDeleted = dao.getPlanetById(createdPlanet.getPlanetId());
        assertNull(checkIfDeleted, "Planet should be null after deleted");
    }

    @Test
    public void updatePlanet_updates_a_planet() {
        Planet newPlanet = new Planet(3, "PlanetToUpdate", "This planet is about to be updated!!!", 33);
        Planet createdPlanet = dao.createPlanet(newPlanet);

        createdPlanet.setName("UpdatedPlanetName");
        createdPlanet.setDescription("Updated Description");
        createdPlanet.setSolarSystemId(333);

        Planet updatedPlanet = dao.updatePlanet(createdPlanet.getPlanetId(), createdPlanet);

        assertNotNull(createdPlanet, "Updated planet should not be updated");
        assertEquals(createdPlanet.getPlanetId(), updatedPlanet.getPlanetId(), "Planet ID between updated and created is the same");
        assertEquals("UpdatedPlanetName", updatedPlanet.getName(), "Name of planet should be updated");
        assertEquals("Updated Description", updatedPlanet.getDescription(), "Description of planet should be updated");
        assertEquals(333, updatedPlanet.getSolarSystemId(), "Solar System ID should be updated");

        Planet checkIfPlanetUpdated = dao.getPlanetById(updatedPlanet.getPlanetId());
        assertEquals(updatedPlanet, checkIfPlanetUpdated, "Planet should match the planet updated");
    }
}



