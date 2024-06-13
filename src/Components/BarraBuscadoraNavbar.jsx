import { useState, useEffect } from "react"
import { ResultadosBusqueda } from './ResultadosBusqueda'
import axios from "axios"
import '../styles/barraBuscadoraNavbar.css'

export const BarraBuscadoraNavbar = () => {
  const [busqueda, setBusqueda] = useState('')
  const [productos, setProductos] = useState([])

  const URL_BACK = import.meta.env.VITE_URL_BACKEND;

  useEffect(() => {
    axios.get(`${URL_BACK}/productos/obtener-productos`)
    .then((response) => {
      setProductos(response.data.producto)
    })
  }, [])
  
  const handleInputChange = (e) => {
    setBusqueda(e.target.value)
  }

  let resultados = []
  if(!busqueda){
    resultados = productos
  }
  else{
    resultados = productos.filter((producto) => producto.nombre.toLowerCase().includes(busqueda.toLowerCase()))
  }

  return (
    <>
      <div className="mt-3 mx-3">
        <input type="text" className='inputBarra' placeholder='Buscar producto...' onChange={handleInputChange} value={busqueda}/>
      </div>

      <div className={busqueda.length > 0 ? "resultados" : "sinResultados"}>
        {
          resultados.length > 0 ?
          resultados.map((producto) => (
            <ResultadosBusqueda key={producto._id} id = {producto._id} nombre={producto.nombre}/>
          ))
          :
          <p className='fw-bold text-center sinResultadosBusqueda'>No se encontraron resultados</p>
        }
      </div>
    </>
  )
}
