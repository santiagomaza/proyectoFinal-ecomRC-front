import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export const BotonPublicarCategoria = ({idCategoria, nombre}) => {
  const navigate = useNavigate()

  const publicarCategoria = () => {
    Swal.fire({
      title: `¿Estás seguro de que quieres publicar la categoria ${nombre}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, publicar!",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if(result.isConfirmed){
        const respuesta = await axios.patch("http://localhost:8000/categorias/publicar-categoria", {
          id: idCategoria,
          publicada: true
        })

        if(respuesta.data.status === 200){
          Swal.fire({
            icon: "success",
            title: `Categoría ${nombre} publicada correctamente`,
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
    <button type='button' className='btn btn-transparent' onClick={publicarCategoria}>
      <i className="bi bi-x-circle-fill fs-2 text-danger"></i>
    </button>
  )
}
