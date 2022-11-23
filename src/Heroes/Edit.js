import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc, deleteDoc, collection, getDocs} from "firebase/firestore"
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { db } from "../firebaseConfig/firebase"
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
const Edit2 = () => {
    const [ nombrereal, setnombrereal ] = useState('')
    const [ nombredevillano, setnombredevillano ] = useState('')
    const [ edad, setedad ] = useState('')
    const [ afiliacion, setafiliacion ] = useState('')
    const [ descripcion, setdescripcion ] = useState('')
    const [ archienemigo, setarchienemigo] = useState('')

    const villanosCollection = collection(db, "heruesyvillanos")
    
    const [villanos, setVillanos] = useState([])

    const navigate = useNavigate()    
    const {id} = useParams()

    const getVillanos = async()=>{
      const villanosData = await getDocs(villanosCollection)
      setVillanos(
        villanosData.docs.map( (doc)=> ({...doc.data(), id:doc.id}))
      )
    }

    const update = async (e) => {
        e.preventDefault()
        const product = doc(db, "Heroes", id)
        const data = {nombrereal: nombrereal, nombredevillano: nombredevillano, edad: edad, afiliacion: afiliacion, descripcion: descripcion, archienemigo: archienemigo}
        await updateDoc(product, data)
        navigate('/Show2')
    }

    const getProductById = async (id) => {
        const product = await getDoc( doc(db, "Heroes", id) )
        if(product.exists()) {
            //console.log(product.data())
            setnombrereal(product.data().nombrereal)   
            setnombredevillano(product.data().nombredevillano) 
            setedad(product.data().edad) 
            setafiliacion(product.data().afiliacion)  
            setdescripcion(product.data().descripcion)
            setarchienemigo(product.data().archienemigo)
            
        }else{
            console.log('El producto no existe')
        }
    }

    useEffect( () => {
        getProductById(id)
        getVillanos()
        // eslint-disable-next-line
    }, [])

    //1 - configuramos los hooks
  const [products, setProducts] = useState( [] )

  //2 - referenciamos a la DB firestore
  const productsCollection = collection(db, "Heroes")

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
   const productDoc = doc(db, "Heroes", id)
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


    

    return (

        <div class="container">
  <div class="row">
    <div class="col">
    <h1>Editar Heroes</h1>
                 <form onSubmit={update}>
                    <div className='mb-3'>
                        <label className='form-label'>Nombre real</label>
                        <input
                            value={nombrereal}
                            onChange={ (e) => setnombrereal(e.target.value)} 
                            type="text"
                            className='form-control'
                        />
                    </div>  
       
                    <div className='mb-3'>
                        <label className='form-label'>Nombre del villano</label>
                        <input
                            value={nombredevillano}
                            onChange={ (e)=> setnombredevillano(e.target.value)} 
                            type="text"
                            className='form-control'
                        />                 
                    </div>  
                    <div className='mb-3'>
                        <label className='form-label'>Edad</label>
                        <input
                            value={edad}
                            onChange={ (e)=> setedad(e.target.value)} 
                            type="text"
                            className='form-control'
                        />                 
                    </div> 
                    <div className='mb-3'>
                         <label>Afiliacion</label>
                    <select onChange={ (e)=> setafiliacion(e.target.value)} value={afiliacion} className='form-control' required>
                    
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

                    <label>Archienemigos</label>
                    <select onChange={(e)=>setarchienemigo(e.target.value)} value={archienemigo} name='archienemigo' className='form-control'>
                      <option>Seleccione un villano</option>
                      {villanos.map((villano)=>(
                        <option value={villano.nombredevillano}>{villano.nombredevillano}</option>
                      ))}
                    </select>                
                    <button type='submit' className='btn btn-primary'>Actualizar</button>
                 </form>   
    </div>
    <div class="col">
     <table className='table table-dark table-hover'>
            <thead>
              <tr>
                <th>Nombre real</th>
                <th>Nombre de heroes</th>
                <th>Edad</th>
                <th>Afiliacion</th>
                <th>Descripcion</th>
                <th>Enemigo</th>
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
                  <td>{product.archienemigo}</td>

                  <td>
                 
                    <Link to={`/edit2/${product.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
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

export default Edit2