import { useState, useEffect } from 'react'
import { NavbarPagina } from "../Components/NavbarPagina"
import { CardsProductos } from "../Components/CardsProductos"
import { Footer } from "../Components/Footer"
import axios from 'axios'

export const Indumentaria = () => {
  const [indumentaria, setIndumentaria] = useState([])
  const [categoriaIndumentaria, setCategoriaIndumentaria] = useState([])
  const URL_BACK = import.meta.env.VITE_URL_BACKEND

  useEffect(() => {
    const obtenerIndumentaria = async () => {
      const respuesta = await axios.get(`${URL_BACK}/productos/obtener-productos`)
      setIndumentaria(respuesta.data.producto.filter((producto) => producto.categoria === "Indumentaria"))
    }

    obtenerIndumentaria()
  }, [])

  useEffect(() => {
    const obtenerCategoriaIndumentaria = async () => {
      const respuesta = await axios.get(`${URL_BACK}/categorias/obtener-categorias`)
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
