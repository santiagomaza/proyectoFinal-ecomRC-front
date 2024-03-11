import './barraBuscadoraNavbar.css'
import { useState, useEffect } from "react"
import axios from "axios"
import  { ResultadosBusqueda }  from '../ResultadosBusqueda/ResultadosBusqueda'

export const BarraBuscadoraNavbar = () => {
  const [busqueda, setBusqueda] = useState('')
  const [productos, setProductos] = useState([])
  
  const handleInputChange = (e) => {
    setBusqueda(e.target.value)
  }
  
  useEffect(() => {
    axios.get("http://localhost:8000/products/obtener-productos")
    .then((response) => {
      setProductos(response.data)
      console.log(response.data)
    })
  }, [])

  let resultados = []

  if(!busqueda){
    resultados = productos
  }
  else{
    resultados = productos.filter((producto) => producto.name.toLowerCase().includes(busqueda.toLowerCase()))
    console.log(resultados)
  }

  return (
    <>
      <div className="mt-3 mx-3">
        <input type="text" className='inputBarra' placeholder='Buscar producto...' onChange={handleInputChange} value={busqueda}/>
      </div>

      <div className='resultados'>
        {
          resultados.length > 0 ?
          resultados.map((producto) => {
            <ResultadosBusqueda key={producto.id} imagen={producto.imagen} nombre={producto.name}/>
          })
          : 
          <div>No se encontraron resultados</div>
        }
      </div>
    </>
  )
}
