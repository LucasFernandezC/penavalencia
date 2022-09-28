
import "./NavBar.scss"
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import LogWidget from "../LogWidget/LogWidget";


const NavBar = () => {

    


    return(
        <>
    <div className="col-md-1 col-lg-3 col-xl-4 col-xxl-6  "></div>
    <div className="col-md-8 col-lg-6 col-xl-5 col-xxl-3 col-sm-12 menudis">
    <Navbar  bg="" expand="lg" className="navbar-nav">
      <Container>
        <Navbar.Brand href=""></Navbar.Brand>
        <Navbar.Toggle aria-controls="" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto menudis  ">
            <Nav.Link href="" ><Link to="/" className="prueba">Home</Link></Nav.Link>
            <Nav.Link href="" ><Link to="/comunidad" className="prueba">Comunidad</Link></Nav.Link>
            <Nav.Link href="" ><Link to="/consultas" className="prueba">Consultas</Link></Nav.Link>
            <Nav.Link href="" ><Link to="/eventos" className="prueba">Eventos</Link></Nav.Link>
            
          </Nav>
          
        </Navbar.Collapse>
        <LogWidget />
      </Container>
      
    </Navbar>
    
    </div>

    </>
    )
}

export default NavBar;