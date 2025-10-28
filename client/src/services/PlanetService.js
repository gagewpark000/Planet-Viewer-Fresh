import axios from "axios";

export default{
    getAllPlanets(){
        return axios.get('/api/planets/')
    },
    addPlanet(planetObject){
        return axios.post('/api/planets', planetObject)
    },
    getPlanet(id){
        return axios.get(`/api/planets/${id}`)
    },
    updatePlanet(id, planetObject){
        return axios.put(`/api/planets/${id}`, planetObject);
    },
    deletePlanet(planetId){
    return axios.delete(`/api/planets/${planetId}`)
    }
}