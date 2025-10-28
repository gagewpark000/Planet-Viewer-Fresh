import { useState, useEffect } from 'react';
import styles from './Home.module.css';
import { NavLink } from 'react-router-dom';
export default function Home() {

    const spaceFacts = [
        "A Day on Venus is longer than a year.",
        "There are more stars in the universe than grains of sand on all the Earth's beaches combined.",
        "Footprints left on the Moon will not disappear as there is no wind.",
        "Mercury & Venus are the only 2 planets in our solar system that have no moons.",
        "The Sun weighs about 330,000 times more than Earth.",
        "Pluto is smaller than the United States.",
        "Because of its unique tilt, a season on Uranus is equivalent to 21 years on Earth.",
        "A day on Pluto lasts for 153.6 hours long."
    ];

    const [fact, setFact] = useState("");
    const [featuredPlanet, setFeaturedPlanet] = useState(null)

    const featuredPlanets = [
        {
            name: "Mercury",
            description: "A rocky planet with a trace atmosphere and a surface gravity slightly higher than that of Mars.",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/330px-Mercury_in_true_color.jpg"
        },
        {
            name: "Venus",
            description: "A planet significantly different from Earth, especially as it has no liquid water, and its atmosphere is far thicker and denser than that of any other rocky body in the Solar System.",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Venus_2_Approach_Image.jpg/330px-Venus_2_Approach_Image.jpg"
        },
        {
            name: "Earth",
            description: "The only known planet to support life, with a diverse climate and abundant water.",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/The_Blue_Marble%2C_AS17-148-22727.jpg/330px-The_Blue_Marble%2C_AS17-148-22727.jpg"
        },
        {
            name: "Mars",
            description: "Mars is a desert-like rocky planet with a tenuous atmosphere that is primarily carbon dioxide.",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png/330px-Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png"
        },
        {
            name: "Jupiter",
            description: "The largest in the solar system, known for its Great Red Spot and many moons, including Ganymede, the largest moon in the solar system.",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Jupiter_OPAL_2024.png/330px-Jupiter_OPAL_2024.png"
        },
        {
            name: "Saturn",
            description: "Saturn has an eighth of the average density of Earth, but is over 95 times more massive.",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/330px-Saturn_during_Equinox.jpg"
        },
        {
            name: "Uranus",
            description: "A gaseous cyan-coloured ice giant made most out of water, ammonia, and methane.",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Uranus_Voyager2_color_calibrated.png/330px-Uranus_Voyager2_color_calibrated.png"
        },
        {
            name: "Neptune",
            description: "The only planet in the Solar System that was not initially observed by direct empirical observation.",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Neptune_Voyager2_color_calibrated.png/330px-Neptune_Voyager2_color_calibrated.png"
        }
    ]

    const showRandomFact = () => {
        const randomIndex = Math.floor(Math.random() * spaceFacts.length);
        setFact(spaceFacts[randomIndex])
    }

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * featuredPlanets.length);
        setFeaturedPlanet(featuredPlanets[randomIndex]);
    }, []);

    return (
        <>
            <div className={styles.homePage}>
                <div className={styles.homeInfo}>
                    <div>
                        <h1 className={styles.header}>Welcome!</h1>
                        <p className={styles.homeP}>This website's purpose is to serve the humans on Earth by giving information on other planets in this universe, as well as giving freedom to create planets here!</p>
                    </div>
                    <ul className={styles.featuresList}>

                        <li>
                            <NavLink to="/planets" className={styles.linkPlanet}>Planets</NavLink>
                            <p className={styles.featureDesc}>
                                Here you will see all of our planets in our Solar System!
                            </p>
                        </li>
                    </ul>
                    <div className={styles.ourSolarSystem}>
                        <h1 className={styles.factHeader}></h1>
                        <div className={styles.funFacts}>
                            <button onClick={showRandomFact} className={styles.factBtn}>Click for a Space Fact!</button>
                            <p className={styles.factDisplay}>{fact}</p>
                        </div>
                    </div>
                    <div>
                        <footer>
                            <p>© 2025 Planet Viewer by Gage Park</p>
                            <p>Planet data and images courtesy of Wikipedia at https://www.wikipedia.org/</p>
                        </footer>
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <NavLink to="/login" className={styles.linkLogin}>Login</NavLink>
                    <p className={styles.featureDesc}>
                        In order to add, delete, or edit our planets on this website, you must be logged in to do so!
                    </p>
                    {featuredPlanet && (
                        <div className={styles.featuredPlanet}>
                            <h2>Featured Planet: {featuredPlanet.name}</h2>
                            <img src={featuredPlanet.img} alt={featuredPlanet.name} className={styles.featuredPlanetImg} />
                            <p><strong>{featuredPlanet.name}</strong> — {featuredPlanet.description}</p>
                        </div>
                    )}
                </div>

            </div>

        </>
    );
}
