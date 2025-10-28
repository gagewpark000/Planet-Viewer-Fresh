import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import PlanetService from "./services/PlanetService";
import styles from './PlanetDetail.module.css';
export default function PlanetDetail() {
    const { id } = useParams();
    const [planet, setPlanet] = useState({ name: '', description: '', solarSystemId: '' });
    const navigate = useNavigate();


    function getPlanet() {
        PlanetService.getPlanet(id).then(
            (response) => {
                setPlanet({ ...response.data, planetId: id, solarSystemId: response.data.solarSystemId || '' })
            });

    }


    useEffect(() => getPlanet(),
        [id]
    )

    function updatePlanet(evt) {
        evt.preventDefault();
        PlanetService.updatePlanet(id, planet).then(
            (response) => {
                if (response.status === 200) {
                    alert('Planet Updated');
                    navigate('/planets')
                }
            }
        )
            .catch((error) => {
                console.error('Failed to update planet:', error);
                alert('Failed to update planet. Please try again.');
            })
    }

    return (
        <div className={styles.planetDetails}>
            <div className={styles.planetDetailsPage}>
                <h1>Planet details for ID: #{id}</h1>
                <form onSubmit={updatePlanet} className={styles.detailForm}>
                    <div className={styles.detailInput}>
                    Name:
                    <input value={planet.name} onChange={(e) => setPlanet({ ...planet, name: e.target.value })} type="text" placeholder="Enter name Here!"/>
                    </div>
                    <div className={styles.detailInput}>
                    Description:
                    <input value={planet.description} onChange={(e) => setPlanet({ ...planet, description: e.target.value })} type="text" placeholder="Enter Description Here!"/>
                    </div>
                    Solar System ID:
                    <select value={planet.solarSystemId || ''} onChange={(e) => setPlanet({ ...planet, solarSystemId: Number(e.target.value) })}>
                        <option value="" disabled>Select one...</option>
                        <option value="1">Solar System 1</option>
                        <option value="2">Solar System 2</option>
                    </select>
                    <button type="submit" className={styles.detailSave}>Save</button>
                </form>
            </div>
        </div>
    )
}
