

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from './PaginaWeb/nav.js';
import Card from './PaginaWeb/card.js';
import Acercade from './PaginaWeb/Acercade.js';



import Show from './Villanos/Show';
import Edit from './Villanos/Edit';

import Show2 from './Heroes/Show';
import Edit2 from './Heroes/Edit';

function app() {
  return (<div>

    
{/* 
<BrowserRouter>
      <Routes>
        <Route path='/' element={ <Show /> } />

        <Route path='/edit/:id' element={ <Edit /> } />
      </Routes>
     </BrowserRouter>  */}


   <BrowserRouter>
       
            <Nav />
            <br></br> <br></br> <br></br> <br></br>
            
      <Routes>
        
            <Route path="/" element={<Card />} />
           
            <Route path="Show" element={<Show />} />
            <Route path='/edit/:id' element={ <Edit /> } />


            <Route path="Show2" element={<Show2 />} />
            <Route path='/edit2/:id' element={ <Edit2 /> } />


            <Route path="Acercade" element={<Acercade/>} />
        
      </Routes>
    </BrowserRouter>
  </div>
   
 
  );
}

export default app;

