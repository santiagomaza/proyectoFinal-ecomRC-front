import { NavbarPagina } from "../Components/NavbarPagina"
import axios from 'axios'
import { useState, useEffect } from 'react'
import { CardsProductos } from "../Components/CardsProductos"
import { Footer } from "../Components/Footer"

export const Indumentaria = () => {
  const [indumentaria, setIndumentaria] = useState([])
  const [categoriaIndumentaria, setCategoriaIndumentaria] = useState([])

  useEffect(() => {
    const obtenerIndumentaria = async () => {
      const respuesta = await axios.get("http://localhost:8000/productos/obtener-productos")
      setIndumentaria(respuesta.data.filter((producto) => producto.categoria === "Indumentaria"))
    }

    obtenerIndumentaria()
  }, [])

  useEffect(() => {
    const obtenerCategoriaIndumentaria = async () => {
      const respuesta = await axios.get("http://localhost:8000/categorias/obtener-categorias")
      setCategoriaIndumentaria(respuesta.data.filter((categoria) => categoria.categoria === "Indumentaria").shift())
    }

    obtenerCategoriaIndumentaria()
  }, [])

  return (
    <>
      <NavbarPagina />
      <div className="pagIndumentaria">
        <h2 className="text-center">Indumentaria</h2>
        <div className="row justify-content-evenly mx-3">
          {
            categoriaIndumentaria.publicada === true?
              indumentaria.length > 0?
                indumentaria.map((indumentaria) => (
                  <CardsProductos key={indumentaria._id} id = {indumentaria._id} nombre={indumentaria.nombre} imagen = {indumentaria.imagen1} precio = {indumentaria.precio}/>
                ))
              :
              <p className='fw-bold text-center'>No se encontraron resultados</p>
            :
            <p className="text-center fs-2">Lo sentimos. Esta categoría no esta publicada</p>
          }
        </div>
      </div>
      <Footer />
    </>
  )
}
