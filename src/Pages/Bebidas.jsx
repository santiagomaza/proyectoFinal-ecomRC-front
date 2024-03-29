import { CardsProductos } from "../Components/CardsProductos"
import { NavbarPagina } from "../Components/NavbarPagina"
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Footer } from '../Components/Footer'

export const Bebidas = () => {
  const [bebidas, setBebidas] = useState([])
  const [categoriaBebidas, setCategoriaBebidas] = useState([])

  useEffect(() => {
    const obtenerProductos = async () => {
      const respuesta = await axios.get("https://proyectofinal-ecomrc-back.onrender.com/productos/obtener-productos")

      setBebidas(respuesta.data.producto.filter((producto) => producto.categoria === "Bebidas"))
    }

    obtenerProductos()
  }, [])

  useEffect(() => {
    const obtenerCategoriasBebidas = async () => {
      const respuesta = await axios.get("https://proyectofinal-ecomrc-back.onrender.com/categorias/obtener-categorias")

      setCategoriaBebidas(respuesta.data.filter((categoria) => categoria.categoria === "Bebidas").shift())
    }

    obtenerCategoriasBebidas()
  }, [categoriaBebidas])


  return (
    <>
      <NavbarPagina />
      <div className="pagBebidas">
        <h2 className="text-center">Bebidas</h2>
        <div className="row d-flex justify-content-evenly mx-3">
          {
            categoriaBebidas.publicada === true ?
              bebidas.length > 0 ?
                bebidas.map((bebidas) => (
                  <CardsProductos key={bebidas._id} id = {bebidas._id} nombre={bebidas.nombre} imagen = {bebidas.imagen1} precio = {bebidas.precio}/>
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
