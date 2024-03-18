import { CardsProductos } from "../../Components/CardsProductos/CardsProductos"
import { NavbarPagina } from "../../Components/Navbar/NavbarPagina"
import axios from 'axios'
import { useState, useEffect } from 'react'

export const Bebidas = () => {
  const [bebidas, setBebidas] = useState([])
  const [categoriaBebidas, setCategoriaBebidas] = useState([])

  useEffect(() => {
    const obtenerProductos = async () => {
      const respuesta = await axios.get("http://localhost:8000/productos/obtener-productos")

      setBebidas(respuesta.data.filter((producto) => producto.categoria === "Bebidas"))
    }

    obtenerProductos()
  }, [])

  useEffect(() => {
    const obtenerCategoriasBebidas = async () => {
      const respuesta = await axios.get("http://localhost:8000/categorias/obtener-categorias")

      setCategoriaBebidas(respuesta.data.filter((categoria) => categoria.categoria === "Bebidas").shift())
    }

    obtenerCategoriasBebidas()
  }, [categoriaBebidas])


  return (
    <>
      <NavbarPagina />
      <div className="row d-flex justify-content-evenly mt-4 mx-1">
        {
          categoriaBebidas.publicada === true ?
          bebidas.map((bebidas) => (
            <CardsProductos key={bebidas._id} nombre={bebidas.nombre} imagen = {bebidas.imagen1} precio = {bebidas.precio}/>
          ))
          :
          <p className="text-center fs-2">Lo sentimos. Esta categoría no esta publicada</p>
        }
        
      </div>
    </>
  )
}
