
import './App.css';
import Header from './components/Header/Header';
import Contacto from './components/pages/Contacto';
import Eventos from './components/pages/Eventos';
import Comunidad from './components/pages/Comunidad';
import Footer from './components/Footer/Footer';
import DetailComunidadContainer from './components/DetailComunidadContainer/DetailComunidadContainer';
import DetailPostContainer from './components/DetailPostContainer/DetailPostContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import LogProvider from "./context/LogContext";
import Home from './components/pages/Home';
import { Routes, Route, BrowserRouter } from "react-router-dom";


function App() {
  return ( 
    <div className="App">
      <BrowserRouter>
      <LogProvider>
        <Header />
        <hr />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/comunidad" element={<Comunidad />}></Route>
          <Route path="/consultas" element={<Contacto />}></Route>
          <Route path="/eventos" element={<Eventos />}></Route>
          <Route path='/comunidad/:category' element={<DetailComunidadContainer />}></Route>
          <Route path="/comunidad/:category/:postid" element={<DetailPostContainer />}></Route>
          </Routes>
        <Footer />
        </LogProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
