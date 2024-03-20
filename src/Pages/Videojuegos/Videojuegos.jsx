import { NavbarPagina } from "../../Components/Navbar/NavbarPagina"
import axios from 'axios'
import { useState, useEffect } from 'react'
import { CardsProductos } from "../../Components/CardsProductos/CardsProductos"

export const Videojuegos = () => {
  const [videojuegos, setVideojuegos] = useState([])
  const [categoriaVideojuegos, setCategoriaVideojuegos] = useState([])

  useEffect(() => {
    const obtenerProductos = async () => {
      const respuesta = await axios.get("http://localhost:8000/productos/obtener-productos")

      setVideojuegos(respuesta.data.filter((producto) => producto.categoria === "Videojuegos"))
    }

    obtenerProductos()
  }, [])

  useEffect(() => {
    const obtenerCategoriasVideojuegos = async () => {
      const respuesta = await axios.get("http://localhost:8000/categorias/obtener-categorias")

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
    </>
  )
}
