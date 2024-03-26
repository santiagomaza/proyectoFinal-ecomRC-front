import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export const BotonEliminarUsuario = ({idUsuario, nombre, usuario}) => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const BD_ELIMINAR_USUARIO = import.meta.env.VITE_BD_URL_BORRAR_USUARIO

  const borrarUsuario = (nombre) => {
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
        if(usuario === "admin.ecomrc"){
          Swal.fire({
            title: "No se puede eliminar al administrador general de la página",
            icon: "warning",
            showConfirmButton: true
          })
        }
        else{
          const respuesta = await axios.delete(BD_ELIMINAR_USUARIO, {
            data: {
              id: idUsuario,
              accessToken: token
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
          else if(respuesta.data.status === 500){
            Swal.fire({
              icon: 'error',
              title: "La accion no se puede realizar porque el token expiró o es inexistente",
              showConfirmButton: false,
              timer: 1500
            })
          }
        } 
      }
    })
  }

  return (
    <>
      <button className="btn btn-danger btn-sm" onClick={() => borrarUsuario(nombre)}> 
        <i className="bi bi-trash2-fill"></i>
      </button>
    </>
  )
}
