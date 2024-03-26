import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const CajaComentario = ({ usuario, producto }) => {
  const navigate = useNavigate()
  const idUsuario = localStorage.getItem("idUsuario")
  const token = localStorage.getItem("token")
  const [usuarioLogueado, setUsuarioLogueado] = useState(null)

  const fecha = Date.now()
  const fechaActual = new Date(fecha)
  const date = fechaActual.toLocaleDateString("es-ES")

  const { handleSubmit, register, formState: { errors } } = useForm()
  
  useEffect(() => {
    if(!idUsuario || !token){
      setUsuarioLogueado(false)
    }
    else{
      setUsuarioLogueado(true)
    }
  }, [idUsuario, token])


  const publicarComentario = async (data) => {
    const respuesta = await axios.post("https://proyectofinal-ecomrc-back.onrender.com/comentarios/crear-comentario", {
      usuario: usuario,
      producto: producto,
      fecha: date,
      mensaje: data.mensaje,
      accessToken: token
    })

    if(respuesta.data.status === 201){
      Swal.fire({
        icon:'success',
        title: "Comentario publicado correctamente",
        showConfirmButton: false,
        timer: 1500
      })

      setTimeout(() => {
        navigate(0)
      }, 1500);
    }
    else if(respuesta.data.status === 500){
      Swal.fire({
        icon: 'error',
        title: "El comentario no se puede publicar porque el token expiró o es inexistente",
        showConfirmButton: true
      })
    }
  }

  return (
    <>
    {
      usuarioLogueado ?
      <form className="mx-4" onSubmit={handleSubmit(publicarComentario)}>
        <textarea autoComplete="off" placeholder="Dejar un comentario..." id="comentario" className="w-100" rows="5" {...register("mensaje", {
          required: {
            value: true,
            message: "El comentario es requerido"
          }
        })}></textarea>
        {
          errors.mensaje?
          <div className="alert alert-danger" role="alert">
            {errors.mensaje.message}
          </div>
          :null
        }
        <button type='submit' className='btn btnComentar fw-bold'>Comentar</button>
      </form>
      :
      <div className='d-flex justify-content-center'>
        <p className='fs-2'>Debes iniciar sesión para poder comentar</p>
      </div>
    }
    </>
  )
}
