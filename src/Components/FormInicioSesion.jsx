import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import logoeComRC from '../assets/ecom.jpg'
import '../styles/formInicioSesion.css'

export const FormInicioSesion = () => {
  const navigate = useNavigate()
  const [iniciandoSesion, setIniciandoSesion] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const URL_BACK = import.meta.env.VITE_URL_BACKEND

  const iniciarSesion = async (data) => {
    setIniciandoSesion(true)
    const respuesta = await axios.post(`${URL_BACK}/usuarios/inicio-sesion`, data)
    console.log(respuesta.data)

    if(respuesta.data.status === 200){
      setIniciandoSesion(false)

      Swal.fire({
        icon: "success",
        title: respuesta.data.message,
        showConfirmButton: false,
        timer: 1500
      })

      sessionStorage.setItem("token", respuesta.data.token)
      sessionStorage.setItem("idUsuario", respuesta.data.usuario._id)

      setTimeout(() => {
        navigate("/", { replace: true })
        navigate(0)
      }, 1500);
    }

    if(respuesta.data.status === 401){
      setIniciandoSesion(false)
      Swal.fire({
        icon: "error",
        title: respuesta.data.message,
        showConfirmButton: true,
      })
    }
    else if(respuesta.data.status == 400){
      setIniciandoSesion(false)
      Swal.fire({
        icon: "error",
        title: respuesta.data.message,
        showConfirmButton: true,
      })
    }
  }

  return (
    <div className="contenedorFormInicio border border-dark">
      <Link to="/">
        <img src={logoeComRC} alt="logoeComRC" style={{height: "100px", width: "100px"}} className='m-3 rounded-circle'/>
      </Link>
      <h2 className='textoIS text-center'>Inicia Sesión en eComRC</h2>
      <form className='formularioIS w-50' onSubmit={handleSubmit(iniciarSesion)}>
        <div className=''>
          <label className='form-label etiquetas'>Nombre de Usuario</label>
          <i className="bi bi-person-fill iconos fs-2"></i>
          <input type='text' autoComplete='off' className='form-control inputLogin' placeholder='ej. pepito123' {...register("username", {
            required: {
              value: true,
              message: "El nombre de usuario es requerido"
            }
          })}/>
          {
            errors.username && <span className='erroresIS text-danger'>{errors.username.message}</span>
          }
        </div>
        <div>
          <label className='form-label etiquetas'>Contraseña</label>
          <i className="bi bi-key-fill iconos fs-2"></i>
          <input type='password' autoComplete='off' className='form-control inputLogin' placeholder='ej. Pepito123*' {...register("contraseña", {
            required: {
              value: true,
              message: "La contraseña es requerida"
            }
          })}/>
        </div>
        {
          errors.contraseña && <span className='erroresIS text-danger'>{errors.contraseña.message}</span>
        }
        <div className='d-flex justify-content-end'>
          <small><Link to="/restablecerContraseña">¿Olvidaste tu contraseña?</Link></small>
        </div>
        <div className='mt-3 d-flex justify-content-center'>
          <span>¿No tienes una cuenta? <Link to="/registrarse">Registrate</Link></span>
        </div>
        {
          iniciandoSesion ?
          <div className='mt-4 d-flex justify-content-center'>
            <div className="spinner-border" role="status"></div>
          </div>
          :
          <div className='mt-4 d-flex justify-content-center'>
            <button type='submit' className='btn btn-dark'>Iniciar Sesión</button>
          </div>
        }
      </form>
    </div>
  )
}
