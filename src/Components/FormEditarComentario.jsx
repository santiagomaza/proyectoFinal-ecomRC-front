import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const FormEditarComentario = ({id, mensaje}) => {
  const { register, handleSubmit, formState: {errors} } = useForm()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const BD_EDITAR_COMENTARIO = import.meta.env.VITE_BD_URL_EDITAR_COMENTARIO

  const fecha = Date.now()
  const fechaActual = new Date(fecha)
  const date = fechaActual.toLocaleDateString("es-ES")

  const editarComentario = (data) => {
    Swal.fire({
      title: `¿Estás seguro de que quieres editar este comentario?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, editar!",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if(result.isConfirmed){
        const respuesta = await axios.patch(BD_EDITAR_COMENTARIO, {
          id: id,
          mensaje: data.mensaje,
          fecha: date,
          accessToken: token
        })
    
        if(respuesta.data.status === 200){
          Swal.fire({
            icon: "success",
            title: respuesta.data.message,
            showConfirmButton: false,
            timer: 1500
          })
    
          setTimeout(() => {
            navigate(0)
          }, 1500)
        }
      }
    })
  }


  return (
    <form onSubmit={handleSubmit(editarComentario)}>
      <label htmlFor="comentario" className="form-label mb-2">Comentario</label>
      <textarea defaultValue={mensaje} id="comentario" cols="30" rows="10" className="w-100" {...register("mensaje", {
        required: {
          value: true,
          message: "El comentario es requerido"
        }
      })}></textarea>
        {
          errors.mensaje && <p className="text-danger">El comentario es requerido</p>
        }
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-outline-primary">Editar Comentario</button>
        </div>
    </form>
  )
}
