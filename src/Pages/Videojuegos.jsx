import { NavbarPagina } from "../Components/NavbarPagina"
import axios from 'axios'
import { useState, useEffect } from 'react'
import { CardsProductos } from "../Components/CardsProductos"
import { Footer } from "../Components/Footer"

export const Videojuegos = () => {
  const [videojuegos, setVideojuegos] = useState([])
  const [categoriaVideojuegos, setCategoriaVideojuegos] = useState([])
  const BD_OBTENER_PRODUCTOS = import.meta.env.VITE_BD_URL_OBTENER_PRODUCTOS
  const BD_OBTENER_CATEGORIAS = import.meta.env.VITE_BD_URL_OBTENER_CATEGORIAS

  useEffect(() => {
    const obtenerProductos = async () => {
      const respuesta = await axios.get(BD_OBTENER_PRODUCTOS)

      setVideojuegos(respuesta.data.filter((producto) => producto.categoria === "Videojuegos"))
    }

    obtenerProductos()
  }, [])

  useEffect(() => {
    const obtenerCategoriasVideojuegos = async () => {
      const respuesta = await axios.get(BD_OBTENER_CATEGORIAS)

      setCategoriaVideojuegos(respuesta.data.filter((categoria) => categoria.categoria === "Videojuegos").shift())
    }

    obtenerCategoriasVideojuegos()
  }, [categoriaVideojuegos])

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
