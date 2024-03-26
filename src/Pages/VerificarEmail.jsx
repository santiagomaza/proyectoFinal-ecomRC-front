import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert';
import logoecomrc from '../assets/ecom.jpg'
import '../styles/verificarEmail.css'

export const VerificarEmail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState({})
  let idUsuarioNuevo = localStorage.getItem("idUsuarioNuevo")
  const BD_USUARIOS = import.meta.env.VITE_BD_URL_USUARIOS
  const BD_CAMBIAR_ESTADO = import.meta.env.VITE_BD_URL_CAMBIAR_ESTADO_USUARIO

  useEffect(() => {
    const obtenerInfoUsuario = async () => {
      const respuesta = await axios.get(`${BD_USUARIOS}/${idUsuarioNuevo}`)
      setUsuario(respuesta.data.usuario)
    }

    obtenerInfoUsuario()
  }, [idUsuarioNuevo, BD_USUARIOS])

  useEffect(() => {
    const cambiarEstadoCuenta = async () => {
      if(usuario._id === id && usuario.estado === "Pendiente"){
        await axios.patch(BD_CAMBIAR_ESTADO, {
          id: idUsuarioNuevo,
          estado: "Activo"
        })
      }
    }

    cambiarEstadoCuenta()
  }, [id, usuario._id])

  useEffect(() => {
    if(id !== idUsuarioNuevo){
      navigate("/", { replace: true })
    }

    if(id === idUsuarioNuevo && (usuario.estado === "Activo" || usuario.estado === "Inactivo")){
      navigate("/", { replace: true })
    }
  }, [id, idUsuarioNuevo])

  return (
    <div className='caja'>
      <article className='d-flex justify-content-center mt-4'>
        <img src={logoecomrc} alt="logoeComRC" className='border rounded-circle' style={{height: "150px", width: "150px"}}/>
      </article>
      {
        usuario._id === id ?
        <div className='d-flex justify-content-center mt-4'>
          <Alert variant="success" className='fs-3'>
            <i className="bi bi-check-circle-fill me-2"></i>
            Cuenta verificada correctamente 
          </Alert>
        </div>
        :
        <div className='d-flex justify-content-center mt-4'>
          <Alert variant="danger" className='fs-3'>
            <i className="bi bi-x-circle-fill me-2"></i>
            No se pudo verificar la cuenta
          </Alert>
        </div>
      }
      <div className='d-flex justify-content-center mt-2 pb-3'>
        <button type='button' className='btn btn-dark' onClick={() => navigate("/", { replace: true })}>Volver a página principal</button>
      </div>
    </div>
  )
}
