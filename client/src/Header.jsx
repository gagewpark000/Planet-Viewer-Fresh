import styles from './Header.module.css'
import { UserContext } from './context/UserContext';
import { useContext } from 'react';

function Header() {
    const { user } = useContext(UserContext);
    return (
        <header>
            <div className={styles.loginStatus}>Status: {""}
                {user ? "Logged in! " : "Not logged in..."}
            </div>
            <div>
                <h1 className={styles.header}>Planet Viewer</h1>
            </div>
        </header>
    );
}
export default Header;