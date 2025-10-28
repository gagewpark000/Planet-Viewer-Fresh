import styles from './Planets.module.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PlanetService from './services/PlanetService';
function Planets() {
    const [planets, setPlanets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:9000/api/planets')
            .then((response) => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then((data) => {
                setPlanets(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.toString());
                setLoading(false);
            });
    }, []);

    function handleDelete(planetId) {
        if (!window.confirm('Are you sure you want to delete this planet?')) return;
            PlanetService.deletePlanet(planetId).then(
                (response) => {
                    alert('Planet deleted successfully')
                    setPlanets((prev) => prev.filter((planet) => planet.planetId !== planetId));
                })
                .catch((error) => {
                    console.error('Error deleting planet:', error);
                    alert('Failed to delete the planet');
                })
                
    }

    if (loading) return <div>Loading planets...</div>;
    if (error) return <div>Error loading planets: {error}</div>;

    return (
        
        <div className={styles.planetsContainer}>
            <h1>🪐Planets in our Solar System🪐</h1>
            <div
                className={styles.cardGrid}>
                {planets.map((planet) => (
                    <div key={planet.planetId} className={styles.planetCard}>
                        <h2>{planet.name}</h2>
                        <p>{planet.description}</p>
                        <div className={styles.cardActions}> 
                        <Link to={'/planet/' + planet.planetId}
                            className={styles.detailView}>
                            Edit Details</Link>
                            </div>
                        <button
                            className={styles.deleteBtn}
                            onClick={() => handleDelete(planet.planetId)}>
                            Delete</button>
                    
                    </div>
                ))}

            </div>
        </div>
    );
}

export default Planets;