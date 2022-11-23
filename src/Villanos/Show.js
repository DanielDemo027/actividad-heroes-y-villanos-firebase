import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc, addDoc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'
const MySwal = withReactContent(Swal)

const Show = () => {
  
  const [ nombrereal, setnombrereal ] = useState('')
  const [ nombredevillano, setnombredevillano ] = useState('')
  const [ edad, setedad] = useState('')
  const [ afiliacion, setafiliacion ] = useState('')
  const [ descripcion, setdescripcion ] = useState('')


  const productsCollection = collection(db, "heruesyvillanos")
  
  const store = async (e) => {
    
    e.preventDefault()
    
    await addDoc( productsCollection, { nombrereal: nombrereal, nombredevillano: nombredevillano, edad: edad, afiliacion: afiliacion, descripcion: descripcion } )
    window.location.href = window.location.href;
    // or
    window.location.replace('');
  }


  //1 - configuramos los hooks
  const [products, setProducts] = useState( [] )

  //2 - referenciamos a la DB firestore


  //3 - Funcion para mostrar TODOS los docs
  const getProducts = async ()   => {
   const data = await getDocs(productsCollection)
   //console.log(data.docs)
   setProducts(
       data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
       
   )
   //console.log(products)
  }
  //4 - Funcion para eliminar un doc
  const deleteProduct = async (id) => {
   const productDoc = doc(db, "heruesyvillanos", id)
   await deleteDoc(productDoc)
   getProducts()
  }
  //5 - Funcion de confirmacion para Sweet Alert 2
  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Elimina el producto?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) { 
        //llamamos a la fcion para eliminar   
        deleteProduct(id)               
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })    
  }
  //6 - usamos useEffect
  useEffect( () => {
    getProducts()
    // eslint-disable-next-line
  }, [] )
  //7 - devolvemos vista de nuestro componente
  return (
    <div class="container">
  <div class="row">
  
    <div class="col">
    <h1>Alta Villanos</h1>

                 <form onSubmit={store}>
                    <div className='mb-3'>
                        <label className='form-label'>Nombre real</label>
                        <input
                            value={nombrereal}
                            onChange={ (e) => setnombrereal(e.target.value)} 
                            type="text"
                            className='form-control'
                            required
                        />
                    </div> 
                    <div className='mb-3'>
                        <label className='form-label'>Nombre de villano</label>
                        <input
                            value={nombredevillano}
                            onChange={ (e) => setnombredevillano(e.target.value)} 
                            type="text"
                            className='form-control'
                            required
                        />
                    </div> 
                    <div className='mb-3'>
                        <label className='form-label'>Edad</label>
                        <input
                            value={edad}
                            onChange={ (e) => setedad(e.target.value)} 
                            type="text"
                            className='form-control'
                            required
                        />
                    </div>  
                    <div className='mb-3'>
                      

                       <label>Afiliacion</label>
      <select onChange={ (e)=> setafiliacion(e.target.value)} value={afiliacion} name='afiliacion' className='form-control' required>
      <option selected >Eliga afiliacion</option>
            <option value='Marvel'>Marvel</option>
            <option value='DC'>Dc</option>
        </select>             
                    </div>  
                    <div className='mb-3'>
                      
                        <label>Descrripcion</label>
                        <textarea 
                        rows="10" 
                        cols="50"
                        className='form-control'
                        value={descripcion}
                        onChange={ (e)=> setdescripcion(e.target.value)}
                        ></textarea>               
                    </div>  
                    <button type='submit' className='btn btn-primary'>Enviar</button>
                 </form>   
    </div>
    <div class="col">
    <table className='table table-dark table-hover'>
            <thead>
              <tr>
                <th>Nombre real</th>
                <th>Nombre de villano</th>
                <th>Edad</th>
                <th>Afiliacion</th>
                <th>Descripcion</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { products.map( (product) => (
                <tr key={product.id}>
                  <td>{product.nombrereal}</td>
                  <td>{product.nombredevillano}</td>
                  <td>{product.edad}</td>
                  <td>{product.afiliacion}</td>
                  <td>{product.descripcion}</td>

                  <td>
                 
                    <Link to={`/edit/${product.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                    <button onClick={ () => { confirmDelete(product.id) } } className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                  </td>
                </tr>                
              )) }
            </tbody>
          </table>
    </div>
  </div>
  </div>
  )
}

export default Show