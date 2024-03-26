import { NavbarPagina } from "../Components/NavbarPagina"
import { CardsProductos } from "../Components/CardsProductos"
import { Footer } from "../Components/Footer"
import axios from 'axios'
import { useState, useEffect } from 'react'

export const Tecnologia = () => {
  const [tecnologia, setTecnologia] = useState([])
  const [categoriaTecnologia, setCategoriaTecnologia] = useState([])

  useEffect(() => {
    const obtenerTecnologia = async () => {
      const respuesta = await axios.get("https://proyectofinal-ecomrc-back.onrender.com/productos/obtener-productos")
      setTecnologia(respuesta.data.filter((producto) => producto.categoria === "Tecnología"))
    }

    obtenerTecnologia()
  }, [])

  useEffect(() => {
    const obtenerCategoriaTecnologia = async () => {
      const respuesta = await axios.get("https://proyectofinal-ecomrc-back.onrender.com/categorias/obtener-categorias")
      setCategoriaTecnologia(respuesta.data.filter((categoria) => categoria.categoria === "Tecnología").shift())
    }

    obtenerCategoriaTecnologia()
  }, [])
  
  return (
    <>
      <NavbarPagina />
      <div className="pagTecnologia">
        <h2 className="text-center">Tecnología</h2>
        <div className="row justify-content-evenly mx-3">
          {
            categoriaTecnologia.publicada === true?
              tecnologia.length > 0?
                tecnologia.map((tec) => (
                  <CardsProductos key={tec._id} id = {tec._id} nombre={tec.nombre} imagen = {tec.imagen1} precio = {tec.precio}/>
                ))
              :
              <p className='fw-bold text-center fs-3'>No se encontraron resultados</p>
            :
            <p className="text-center fs-2">Lo sentimos. Esta categoría no esta publicada</p>
          }
        </div>
      </div>
      <Footer />
    </>
  )
}
