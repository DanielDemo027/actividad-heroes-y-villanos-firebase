import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import { Outlet, Link } from "react-router-dom";

function card() {
  return (<div className='container-md'>


<CardGroup>
      <Card>
        <Image className='DcYmarvel' src="HeroesMD.jpg"></Image>
        <Card.Body>
          <Card.Title>Heroes</Card.Title>
          <Card.Text>
            Lograras ver informacion de tus Heroes favoritos de dc y marvel
          </Card.Text>
        </Card.Body>
        <Card.Footer>
        <center><Link to='Show2'><Button variant="primary">Ver informacion</Button></Link></center>
        </Card.Footer>
      </Card>
      <Card>
        <Image className='Dcvillanos' src="VillanosMD.jpg"></Image>
        <Card.Body>
          <Card.Title>Villanos</Card.Title>
          <Card.Text>
          Lograras ver informacion de tus Villanos favoritos de dc y marvel
          </Card.Text>
        </Card.Body>
        <Card.Footer>
        <center><Link to='Show'><Button variant="primary">Ver informacion</Button></Link></center>
        
        </Card.Footer>
      </Card>

    </CardGroup>
    <Outlet />
  </div>
    
  );
}

export default card;