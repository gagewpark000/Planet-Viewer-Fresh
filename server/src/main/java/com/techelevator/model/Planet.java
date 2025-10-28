package com.techelevator.model;

public class Planet {
    private int planetId;
    private String name;
    private String description;
    private int solarSystemId;

    public Planet() {}

    public Planet(int planetId, String name, String description, int solarSystemId){
        this.planetId = planetId;
        this.name = name;
        this.description = description;
        this.solarSystemId = solarSystemId;
    }

    public int getPlanetId() {
        return planetId;
    }

    public void setPlanetId(int planetId) {
        this.planetId = planetId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getSolarSystemId() {
        return solarSystemId;
    }

    public void setSolarSystemId(int solarSystemId) {
        this.solarSystemId = solarSystemId;
    }
}
