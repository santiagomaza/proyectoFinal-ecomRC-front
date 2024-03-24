import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export const BotonEliminarComentario = ({ id }) => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const eliminarComentario = () => {
    Swal.fire({
      title: `¿Estás seguro de que quieres eliminar este comentario?`,
      text: "No se podrá revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#808B96",
      confirmButtonText: "Si, borrar!"
    }).then(async(result) => {
      if(result.isConfirmed) {
        await axios.delete(`http://localhost:8000/comentarios/borrar-comentario`, {
          data: {
            id: id,
            accessToken: token
          }
        })

        Swal.fire({
          icon: "success",
          title: `Comentario eliminado correctamente`,
          showConfirmButton: false,
          timer: 1500
        })

        setTimeout(() => {
          navigate(0)
        }, 1500);
      }
    })
  } 

  return (
    <button className="btn btn-transparent border border-0 bg-transparent" onClick={eliminarComentario}>
      <i className="bi bi-trash text-danger"></i>
    </button>
  )
}
