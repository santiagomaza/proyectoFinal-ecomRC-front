import '../../styles/formInicioSesion.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import logoeComRC from '../../assets/ecom.jpg'

export const FormInicioSesion = () => {
  const navigate = useNavigate()
  const [iniciandoSesion, setIniciandoSesion] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const iniciarSesion = async (data) => {
    setIniciandoSesion(true)
    const respuesta = await axios.post("http://localhost:8000/usuarios/inicio-sesion", data)
    console.log(respuesta.data)

    if(respuesta.data.status === 200){
      setIniciandoSesion(false)
      Swal.fire({
        icon: "success",
        title: respuesta.data.message,
        showConfirmButton: false,
        timer: 1500
      })

      localStorage.setItem("token", respuesta.data.token)
      localStorage.setItem("idUsuario", respuesta.data.usuario._id)

      setTimeout(() => {
        navigate("/", { replace: true})
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
          <input type='text' autoComplete='off' className='form-control' placeholder='ej. santimaza99' {...register("username", {
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
          <input type='password' autoComplete='off' className='form-control' placeholder='ej. Pepito123*' {...register("contraseña", {
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
