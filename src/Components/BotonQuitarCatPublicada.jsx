import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

export const BotonQuitarCatPublicada = ({idCategoria, nombre}) => {
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token')
  const URL_BACK = import.meta.env.VITE_URL_BACKEND

  const quitarPublicada = () => {
    Swal.fire({
      title: `¿Estás seguro de que quieres que la categoria ${nombre} deje de ser publicada?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, quitar publicada!",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if(result.isConfirmed){
        const respuesta = await axios.patch(`${URL_BACK}/categorias/publicar-categoria`, {
          id: idCategoria,
          publicada: false,
          accessToken: token
        })

        if(respuesta.data.status === 200){
          Swal.fire({
            icon: "success",
            title: `La categoria ${nombre} ya no está mas publicada`,
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
            title: "Esta acción no se puede realizar porque el token expiró o es inexistente",
            showConfirmButton: true,
            timer: 1500
          })
        }
      }
    })
  }
  return (
    <button type="button" className="btn btn-transparent" onClick={quitarPublicada}>
      <i className="bi bi-check-circle-fill fs-2 text-success"></i>
    </button>
  )
}
