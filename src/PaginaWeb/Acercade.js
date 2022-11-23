

import Carousel from 'react-bootstrap/Carousel';

function Acercade() {
  return (<div>
    <h1 className='Acercade'>Acerca de</h1>
    <br></br><br></br>
    <Carousel fade className='container-md'>
      <Carousel.Item >
        <img
          className="ImagenAcerca"
          src="kevin.jpg"
          alt="First slide"
          
        />
        <Carousel.Caption>
        <div className='CentrarInformacion'>
          <h3 className='tituloAcercade'>Ing en programacion y web master</h3>
          <p className='NombreAcercade'>Kevin Rafael Guzman Arjona.</p>
        </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="ImagenAcerca"
          src="daniel.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
        <div className='CentrarInformacion'>
          <h3 className='tituloAcercade'>Ing en programacion y web master</h3>
          <p className='NombreAcercade'>Daniel Antonio Saravia Naal</p>
        </div>
        </Carousel.Caption>
      </Carousel.Item>
      
    </Carousel>
<br></br><br></br><br></br>
                
  </div>);
}

export default Acercade;