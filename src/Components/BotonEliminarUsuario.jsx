import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export const BotonEliminarUsuario = ({idUsuario, nombre, usuario}) => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [usuarioEsp, setUsuarioEsp] = useState({})
  const idUsuarioLogueado = localStorage.getItem("idUsuario");

  useEffect(() => {
    if(idUsuarioLogueado){
      const obtenerUsuario = async () => {
        const respuesta = await axios.get(`http://localhost:8000/usuarios/${idUsuarioLogueado}`);
        setUsuarioEsp(respuesta.data.usuario);
      }

      obtenerUsuario()
    }
  }, [])

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
          const respuesta = await axios.delete("http://localhost:8000/usuarios/eliminar-usuario", {
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
      {
        usuarioEsp.estado === "Pendiente" ?
        <button className="btn btn-danger btn-sm" onClick={() => borrarUsuario(nombre)} disabled> 
          <i className="bi bi-trash2-fill"></i>
        </button>
        :
        usuarioEsp.estado === "Activo" ?
        <button className="btn btn-danger btn-sm" onClick={() => borrarUsuario(nombre)}> 
          <i className="bi bi-trash2-fill"></i>
        </button>
        :
        null
      }
    </>
  )
}
