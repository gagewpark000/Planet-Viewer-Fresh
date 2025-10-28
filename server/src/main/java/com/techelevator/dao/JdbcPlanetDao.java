package com.techelevator.dao;

import com.techelevator.exception.DaoException;
import com.techelevator.model.Planet;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;


import java.util.ArrayList;
import java.util.List;
@Component
public class JdbcPlanetDao implements PlanetDao {
    private final JdbcTemplate jdbcTemplate;

    public JdbcPlanetDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Planet getPlanetById(int planetId) {

        Planet planet = null;
        String sql = "SELECT * FROM planets WHERE planet_id = ?";

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, planetId);
            if (results.next()) {
                planet = mapRowToPlanet(results);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return planet;
    }

    @Override
    public List<Planet> getAllPlanets() {

        List<Planet> planets = new ArrayList<>();
        String sql = "SELECT * FROM planets ";

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()) {
                Planet planet = mapRowToPlanet(results);
                planets.add(planet);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return planets;
    }

    @Override
    public Planet createPlanet(Planet newPlanet) {

        String insertPlanetSql = "INSERT INTO planets " +
                "(name, description, solar_system_id) " +
                "VALUES (?, ?, ?) " +
                "RETURNING planet_id";

        if (newPlanet.getName() == null) {
            throw new DaoException("Planet cannot be created with null name");
        }
        try {
            Integer planetId = jdbcTemplate.queryForObject(insertPlanetSql, Integer.class,
                    newPlanet.getName(), newPlanet.getDescription(), newPlanet.getSolarSystemId());

            return getPlanetById(planetId);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Data integrity violation", e);
        }
    }

    public boolean deletePlanet(int planetId) {
        String sql = "DELETE from planets where planet_id = ?";

        try {
            int rowsDeleted = jdbcTemplate.update(sql, planetId);
            return rowsDeleted > 0;
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
    }


    public Planet updatePlanet(int planetId, Planet updatedPlanet) {
        String sql = "UPDATE planets SET name = ?, description = ?, solar_system_id = ? where planet_id = ?";
        try {
            int rowsUpdated = jdbcTemplate.update(sql, updatedPlanet.getName(), updatedPlanet.getDescription(), updatedPlanet.getSolarSystemId(), planetId);

            if (rowsUpdated == 0) {
                throw new DaoException("Planet with id: " + planetId + "not found.");

            }
            return getPlanetById(planetId);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Data integrity violation", e);
        }


    }
    private Planet mapRowToPlanet(SqlRowSet rs) {
        Planet planet = new Planet();
        planet.setPlanetId(rs.getInt("planet_id"));
        planet.setName(rs.getString("name"));
        planet.setDescription(rs.getString("description"));
        planet.setSolarSystemId(rs.getInt("solar_system_id"));
        return planet;
    }

}

