import logoeComRC from '../../assets/ecom.jpg'
import '../../styles/formRestablecerContraseña.css'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import axios from 'axios'

export const FormRestablecerContraseña = ({token}) => {
  const navigate = useNavigate()
  let emailUsuario = localStorage.getItem('email')
  let tokenUsuario = localStorage.getItem('tokenRecContraseña')
  let idUsuario = localStorage.getItem('idUsuario')
  const { register, watch, handleSubmit, formState: { errors } } = useForm()
  const [cambiandoContraseña, setCambiandoContraseña] = useState(false)

  useEffect(() => {
    if(!emailUsuario){
      navigate("/")
    }
  }, [emailUsuario])

  useEffect(() => {
    if(token !== tokenUsuario){
      navigate("/")
    }
  }, [tokenUsuario])

  const cambiarContraseña = async (data) => {
    setCambiandoContraseña(true)

    const respuesta = await axios.patch("http://localhost:8000/usuarios/restablecer-contrasenia", {
      id: idUsuario,
      contraseña: data.contraseña
    })

    if(respuesta.data.status === 200){
      setCambiandoContraseña(false)
      Swal.fire({
        icon: "success",
        title: "Contraseña restablecida correctamente",
        showConfirmButton: false,
        timer: 1500
      })

      setTimeout(() => {
        navigate("/", {replace: true})

        localStorage.removeItem('email')
        localStorage.removeItem('tokenRecContraseña')
        localStorage.removeItem('idUsuario')
      }, 1500);
    }
  }

  return (
    <div className="contenedorFormRC border border-dark">
      <Link to="/">
        <img src={logoeComRC} alt="logoeComRC" style={{height: "100px", width: "100px"}} className='m-3 rounded-circle'/>
      </Link>
      <h2 className='text-center tituloRC'>Restablecer Contraseña</h2>
      <form className='formularioRC' onSubmit={handleSubmit(cambiarContraseña)}>
        <div className='mb-4'>
          <label className='form-label etiquetas'>Email</label>
          <i className="bi bi-envelope-at-fill iconos fs-2"></i>
          <input type='text' autoComplete='off' className='w-50 form-control' placeholder='ej. santimaza99' value={emailUsuario} disabled/>
        </div>
        <p className='caracteristicasContraseña'>La contraseña debe tener por lo menos 8 caracteres, 1 letra mayuscula, 1 letra minuscula, un número, y un caracter especial (#.-)</p>
        <article className='inputsContraseñas'>
          <div className='mb-1'>
            <label className='form-label etiquetas'>Contraseña</label>
            <i className="bi bi-key-fill iconos fs-2"></i>
            <input type='password' className='contraseñas w-50 form-control' placeholder='ej. Pepito123*' {...register("contraseña", {
              required: {
                value: true,
                message: "La contraseña es requerida"
              },
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres"
              },
              maxLength: {
                value: 15,
                message: "La contraseña no debe tener más de 15 caracteres"
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*._-])(?=.{8,})/,
                message: "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial"
              }
            })} maxLength="15"/>
          </div>
          {
            errors.contraseña && (
              <span className="erroresFormRC text-danger">
                {errors.contraseña.message}
              </span>
            )
          }
          <div className='mb-1 mt-2'>
            <label className='form-label etiquetas'>Repetir Contraseña</label>
            <i className="bi bi-key-fill iconos fs-2"></i>
            <input type='password' className='contraseñas w-50 form-control' placeholder='ej. Pepito123*' {...register("repContraseña", {
              required: {
                value: true,
                message: "Repetir contraseña es requerida"
              },
              validate: (value) => value === watch("contraseña") || "Las contraseñas no coinciden"
            })}/>
          </div>
          {
            errors.repContraseña && <span className='text-danger erroresFormRC'>{errors.repContraseña.message}</span>
          }
        </article>
        {
          cambiandoContraseña ?
            <div className="spinnerResContraseña spinner-border" role="status"></div>
          :
          <button type='submit' className='botonCambiarContraseña btn btn-dark'>Cambiar Contraseña</button>
        }
      </form>
    </div>
  )
}
