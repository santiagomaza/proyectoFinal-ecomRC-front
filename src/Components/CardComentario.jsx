import { useState, useEffect } from 'react'
import { BotonEditarComentario } from './BotonEditarComentario'
import { BotonEliminarComentario } from './BotonEliminarComentario'
import axios from 'axios'
import '../styles/cardComentario.css'

export const CardComentario = ({ id, usuario, msj, fecha }) => {
  const [usuarioEsp, setUsuario] = useState({})
  const idUsuario = sessionStorage.getItem('idUsuario')
  const URL_BACK = import.meta.env.VITE_URL_BACKEND

  useEffect(() => {
    if(idUsuario){
      const obtenerUsuario = async () => {
        const respuesta = await axios.get(`${URL_BACK}/usuarios/${idUsuario}`);
        setUsuario(respuesta.data.usuario)
      }

      obtenerUsuario()
    }
  }, [])

  return (
    <div className="card mt-4 mx-4">
      <div className="card-body cbComentario">
        <span className="fw-bold">{usuario}</span>
        <span className="fs-6 d-block">{fecha}</span>
        <p className="mt-2">{msj}</p>
        <div className={idUsuario ? "d-flex justify-content-end botonesCardComentario": "d-none invisible"}>
          {
            usuario === usuarioEsp.username ?
            <>
              <BotonEditarComentario id = {id} mensaje = {msj}/>
              <BotonEliminarComentario id = {id}/>
            </>
            :
            usuarioEsp.rol === "admin" ?
            <div className='ms-auto btnBorrarComentario'>
              <BotonEliminarComentario id = {id}/>
            </div>
            :
            null
          }
        </div>
      </div>
    </div>
  )
}
