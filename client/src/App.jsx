import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import LoginView from './views/LoginView/LoginView';
import LogoutView from './views/LogoutView';
import RegisterView from './views/RegisterView/RegisterView';
import Header from './Header';
import Planets from './Planets';
import Home from './views/Home';
import AddPlanet from './AddPlanet';
import PlanetDetail from './PlanetDetail';
import './styles.css';
import { UserProvider } from './context/UserContext';

export default function App() {

  
  return (
    <div id="cart-app">
      <UserProvider>
      <BrowserRouter>
        <NavBar />
        <main>
          <Header/>
          <Routes>
            <Route path="/login" element={<LoginView />} />
            <Route path="/logout" element={<LogoutView />} />
            <Route path="/register" element={<RegisterView />} />
            <Route path="/planets" element={<><Planets/> <AddPlanet/> </>} /> 
            <Route path="/planet/:id" element={<PlanetDetail />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </BrowserRouter>
      </UserProvider>
    </div>
    
  );
}
