import { NavbarPagina } from "../Components/NavbarPagina"
import axios from 'axios'
import { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import '../styles/favoritos.css'
import { Footer } from "../Components/Footer"

export const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([])
  const [usuario, setUsuario] = useState({})
  const [hayFavoritos, setHayFavoritos] = useState(false)
  const navigate = useNavigate()

  const idUsuario = localStorage.getItem('idUsuario')

  useEffect(() => {
    if(!idUsuario){
      navigate("/", { replace: true })
    }
  }, [])

  useEffect(() => {
    const obtenerFavoritos = async () => {
      const respuesta = await axios.get('http://localhost:8000/favoritos/obtener-favoritos')
      setFavoritos(respuesta.data)
      console.log(respuesta.data)
    }

    obtenerFavoritos()
  }, [])

  useEffect(() => {
    if(idUsuario){
      const obtenerUsuarioEspecifico = async () => {
        const respuesta = await axios.get(`http://localhost:8000/usuarios/${idUsuario}`)
        setUsuario(respuesta.data.usuario)
      }
  
      obtenerUsuarioEspecifico()
    }
  }, [idUsuario])

  const favoritosUsuario = favoritos.filter((favorito) => favorito.usuario === usuario.username)

  useEffect(() => {
    if(favoritosUsuario.length > 0) {
      setHayFavoritos(true)
    }
  }, [favoritosUsuario.length])

  const quitarFavoritos = async (id) => {
    await axios.delete(`http://localhost:8000/favoritos/borrar-favorito`, {
      data: {
        id: id
      }
    })

    setTimeout(() => {
      navigate(0)
    }, 1500);
  }

  return (
    <>
      <NavbarPagina />
      <div className="pagFavoritos">
        <h2 className="text-center">Tus Favoritos</h2>
        {
          hayFavoritos?
          <div className="row mx-2">
            { 
              favoritosUsuario.map((favorito) => (
                <div key={favorito._id} className="d-flex justify-content-center col-md-3 mb-3">
                  <div className="card" style={{width: "18rem"}}>
                    <img src={favorito.producto.imagen1} className="card-img-top" alt="Imagen producto" style={{height: "280px"}}/>
                    <div className="card-body" style={{backgroundColor: "#f4ae2b"}}>
                      <h6 className="card-title">{favorito.producto.nombre}</h6>
                      {
                        favorito.producto.precio === 0 ?
                          <p className="card-text fw-bold">Gratis</p>
                          :
                          <p className="card-text fw-bold">${favorito.producto.precio}</p>
                      }
                      <Link to={`/producto/${favorito.producto._id}`}>
                        <button href="#" className="btn btn-dark btn-sm fw-bold">VER DETALLES</button>
                      </Link>
                      <button className="d-block btn btn fs-6 mt-1 text-primary btnEliminarFavoritos" onClick={() => quitarFavoritos(favorito._id)}>Eliminar de Favoritos</button>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          :
          <>
            <div className="d-flex justify-content-center mt-2 mx-3">
            <i className="text-warning sinFavoritos bi bi-star-fill"></i>
            </div>
            <h3 className="text-center">Tu lista de favoritos esta vacía</h3>
            <h4 className="text-center mt-3">¡Explora los distintos productos que ofrecemos en eComRC y agregalos a la lista!</h4>
          </>
        }
      </div>
      <Footer />
    </>
  )
}
