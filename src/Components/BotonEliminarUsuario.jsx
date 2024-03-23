import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export const BotonEliminarUsuario = ({idUsuario, nombre}) => {
  const navigate = useNavigate()

  const borrarUsuario = () => {
    Swal.fire({
      title: `¿Estás seguro de que quieres eliminar a ${nombre}?`,
      text: "No se puede revertir el proceso en caso de eliminar el usuario",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#808B96",
      confirmButtonText: "Si, borrar!"
    }).then(async (result) => {
      if(result.isConfirmed){
        const respuesta = await axios.delete("http://localhost:8000/usuarios/eliminar-usuario", {
          data: {
            id: idUsuario
          }
        })
        console.log(respuesta)

        if(respuesta.data.status === 200){
          Swal.fire({
            icon:'success',
            title: respuesta.data.message,
            showConfirmButton: false,
            timer: 1500
          })

          setTimeout(() => {
            navigate(0)
          }, 1500);
        } 
      }
    })
  }

  return (
    <>
      <button className="btn btn-danger btn-sm" onClick={() => borrarUsuario(idUsuario, nombre)}> 
        <i className="bi bi-trash2-fill"></i>
      </button>
    </>
  )
}
