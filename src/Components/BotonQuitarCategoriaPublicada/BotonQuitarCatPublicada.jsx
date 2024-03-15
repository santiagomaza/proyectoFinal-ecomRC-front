import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export const BotonQuitarCatPublicada = ({idCategoria, nombre}) => {
  const navigate = useNavigate()

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
        const respuesta = await axios.patch("http://localhost:8000/categorias/publicar-categoria", {
          id: idCategoria,
          publicada: false
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
      }
    })
  }
  return (
    <button type="button" className="btn btn-transparent" onClick={quitarPublicada}>
      <i className="bi bi-check-circle-fill fs-2 text-success"></i>
    </button>
  )
}
