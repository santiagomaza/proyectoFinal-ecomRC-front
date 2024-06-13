import { useState, useEffect } from 'react'
import { NavbarPagina } from "../Components/NavbarPagina"
import { CardsProductos } from "../Components/CardsProductos"
import { Footer } from "../Components/Footer"
import axios from 'axios'

export const Videojuegos = () => {
  const [videojuegos, setVideojuegos] = useState([])
  const [categoriaVideojuegos, setCategoriaVideojuegos] = useState([])
  const URL_BACK = import.meta.env.VITE_URL_BACKEND

  useEffect(() => {
    const obtenerProductos = async () => {
      const respuesta = await axios.get(`${URL_BACK}/productos/obtener-productos`)

      setVideojuegos(respuesta.data.producto.filter((producto) => producto.categoria === "Videojuegos"))
    }

    obtenerProductos()
  }, [])

  useEffect(() => {
    const obtenerCategoriasVideojuegos = async () => {
      const respuesta = await axios.get(`${URL_BACK}/categorias/obtener-categorias`)

      setCategoriaVideojuegos(respuesta.data.filter((categoria) => categoria.categoria === "Videojuegos").shift())
    }

    obtenerCategoriasVideojuegos()
  }, [])

  return (
    <>
      <NavbarPagina />
      <div className="pagVideojuegos">
        <div className="row mx-5">
          {
            categoriaVideojuegos.publicada === true ?
              videojuegos.length > 0 ?
                videojuegos.map((videojuego) => (
                  <CardsProductos key = {videojuego._id} id={videojuego._id} imagen = {videojuego.imagen1} nombre = {videojuego.nombre} precio = {videojuego.precio}/>
                ))
              :
              <p className='fw-bold text-center fs-2'>No se encontraron resultados</p>
            :
            <p className='text-center fs-2'>Lo sentimos. Esta categoria no esta publicada</p>
          }
        </div>
      </div>
      <Footer />
    </>
  )
}
