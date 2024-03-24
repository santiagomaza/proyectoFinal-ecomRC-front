import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export const BotonEliminarCategoria = ({ idCategoria, nombre }) => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const eliminarCategoria = () => {
    Swal.fire({
      title: `¿Estás seguro de que quieres eliminar la categoria ${nombre}?`,
      text: "No se puede revertir el proceso en caso de eliminar la categoria",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#808B96",
      confirmButtonText: "Si, borrar!"
    }).then(async (result) => {
      if(result.isConfirmed){
        const respuesta = await axios.delete("http://localhost:8000/categorias/borrar-categoria", {
          data: {
            id: idCategoria,
            accessToken: token
          }
        })

        if(respuesta.data.status === 200){
          Swal.fire({
            icon: "success",
            title: `Categoria ${nombre} eliminada con exito`,
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
            title: "No se puede eliminar la categoria porque el token expiró o no existe",
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
    })
  }

  return (
    <button type="button" className="btn btn-danger btn-sm" onClick={() => eliminarCategoria(idCategoria, nombre)}>
      <i className="bi bi-trash2-fill"></i>
    </button>
  )
}
