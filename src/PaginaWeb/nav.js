
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image'

import { Outlet, Link } from "react-router-dom";



import './style.css';
function nav() {
  return (<div>
    <Navbar bg="dark" expand="lg">
    <Container>

    <Navbar.Brand className="text-primary" href="#home" >
    <Link to="/"><Image  className="imagenPrincipal" src='super.png'></Image></Link>
      </Navbar.Brand>

      <Navbar.Brand className="text-light" href="#home" >
          <Link className="text-light text-decoration-none " to='Show2'>SuperHeroes</Link>
      </Navbar.Brand>

      <Navbar.Brand className="text-light " href="./index_villano.js" >
     <Link className="text-light text-decoration-none " to='Show'>Villanos</Link>

     

     </Navbar.Brand>

      <Navbar.Brand className="text-light" href="#home" >
       <Link className="text-light text-decoration-none " to='Acercade'>Acerca de</Link>

     </Navbar.Brand>
      
     <Navbar.Brand className="text-primary" href="#home" >
     <Link to="/"><Image  className="imagenPrincipal" src='tanos.png'></Image></Link>
      </Navbar.Brand>
    </Container>
   
  </Navbar>
  <Outlet />
 </div> );
}

export default nav;

