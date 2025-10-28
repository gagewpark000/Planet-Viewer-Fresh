import styles from './AddPlanet.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlanetService from './services/PlanetService.js';

export default function AddPlanet() {

    const [planet, setPlanet] = useState({});
    const navigate = useNavigate();

    function submitForm(evt) {
        evt.preventDefault();
        console.log('submitForm called', planet);
        PlanetService.addPlanet(planet).then(
            (response) => {
                if(response.status === 200){
                    alert('Planet added!')
                    navigate('/planets')
                }
                
        
            }
        )
            .catch((error) => {
                console.error('Failed to add planet:', error);
                alert('Failed to add planet. Please try again.');
            })
    }

    return (
        <>
            <div className={styles.addPlanetCard}>
                <h1 className={styles.addPlanetHeader}>Add a Planet!</h1>
                <form onSubmit={submitForm} className={styles.addPlanetForm}>
                    <label>Name: <input type="text" value={planet.name || ''} onChange={(e) => setPlanet({ ...planet, name: e.target.value })} /> </label> <br />
                    <label>Description: <input type="text" value={planet.description || ''} onChange={(e) => setPlanet({ ...planet, description: e.target.value })} /> </label> <br />
                    <label>
                        Solar System ID:
                        <select className={styles.selectIdBtn} value={planet.solarSystemId || ''} onChange={(e) => setPlanet({ ...planet, solarSystemId: Number(e.target.value) })}>
                            <option value="" disabled>Select one...</option>
                            <option value="1">Solar System 1</option>
                            <option value="2">Solar System 2</option>
                        </select>
                    </label>
                    <button type="submit" className={styles.addPlanetBtn}>Add!</button>
                </form>
            </div>
        </>
    );
}