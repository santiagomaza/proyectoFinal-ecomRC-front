import './formRegistro.css'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import ModalInfoRegistro from '../ModalInfoRegistro/ModalInfoRegistro'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logoeComRC from  '../../assets/ecom.jpg'

export const FormRegistro = () => {
  const navigate = useNavigate()
  const [registro, setRegistro] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  const registrarse = async (data) => {
    setRegistro(true)
    const respuesta = await axios.post("http://localhost:8000/usuarios/registrar-usuario", data)
    console.log(respuesta)

    if(respuesta.data.status === 201){
      setRegistro(false)
      Swal.fire({
        icon:'success',
        title: respuesta.data.message,
        showConfirmButton: false,
        timer: 1500
      })

      setTimeout(() => {
        navigate("/login", { replace: true})
      }, 1500);
    }
    else if(respuesta.data.status === 400){
      setRegistro(false)
      Swal.fire({
        icon: 'info',
        title: respuesta.data.message,
        showConfirmButton: true,
      })
    }
    else if(respuesta.data.status === 401){
      setRegistro(false)
      Swal.fire({
        icon: 'info',
        title: respuesta.data.message,
        showConfirmButton: true,
      })
    }
    else if(respuesta.data.status === 402){
      setRegistro(false)
      Swal.fire({
        icon: 'info',
        title: respuesta.data.message,
        showConfirmButton: true,
      })
    }
  }

  return (
    <div className="contenedor border border-dark">
      <img src={logoeComRC} alt="logo eComRC" style={{height: "100px", width: "100px"}} className='m-3 rounded-circle'/>
      <h2 className='texto text-center'>Crea tu cuenta en eComRC</h2>
      <small className='textoInfo fw-bold'>Apriete en el boton para leer la información antes de registrarse</small>     
      <ModalInfoRegistro/>
      <form onSubmit={handleSubmit(registrarse)} className='formulario d-flex flex-wrap justify-content-between mt-1 mx-5'>
        <article className=''>
          <div className='mb-1'>
            <label className='form-label'>Nombre Completo</label>
            <input type='text' className='form-control' autoComplete='off' placeholder='ej. Santiago Maza' {...register("nombre", {
              required: {
                value: true,
                message: "El nombre es requerido"
              },
              minLength: {
                value: 5,
                message: "El nombre debe tener al menos 5 caracteres"
              },
              maxLength: {
                value: 30,
                message: "El nombre no debe tener más de 30 caracteres"
              }
            })}/>
          </div>
          {
            errors.nombre && <span className='errores text-danger'>{errors.nombre.message}</span>
          }
          <div className='mb-1'>
            <label className='form-label'>Nombre de Usuario</label>
            <input type='text' className='form-control' placeholder='ej. santimaza99' {...register("username", {
              required: {
                value: true,
                message: "El nombre de usuario es requerido"
              },
              minLength: {
                value: 5,
                message: "El nombre de usuario debe tener al menos 5 caracteres"
              },
              maxLength: {
                value: 15,
                message: "El nombre de usuario no debe tener más de 15 caracteres"
              }
            })}/>
          </div>
          {
            errors.username && <span className='errores text-danger'>{errors.username.message}</span>
          }
          <div className='mb-1'>
            <label className='form-label'>Domicilio</label>
            <input type='text' className='form-control' placeholder='ej. Av Belgrano 1550' {...register("domicilio", {
              required: {
                value: true,
                message: "El domicilio es requerido"
              },
              minLength: {
                value: 8,
                message: "El domicilio debe tener al menos 8 caracteres"
              },
              maxLength: {
                value: 60,
                message: "El domicilio no debe tener más de 60 caracteres"
              }
            })}/>
          </div>
          {
            errors.domicilio && <span className='errores text-danger'>{errors.domicilio.message}</span>
          }
          <div className='mb-1'>
            <label className='form-label'>Email</label>
            <input type='email' className='form-control' placeholder='ej. pepito45@gmail.com' {...register("email", {
              required: {
                value: true,
                message: "El email es requerido"
              },
              minLength: {
                value: 4,
                message: "El email debe tener al menos 4 caracteres"
              },
              maxLength: {
                value: 30,
                message: "El email no debe tener más de 30 caracteres"
              },
              pattern:{
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
                message: "El email no es válido"
              }
            })}/>
          </div>
          {
            errors.email && <span className='errores text-danger'>{errors.email.message}</span>
          }
          <div className='mb-1'>
            <label className='form-label'>País de Nacimiento</label>
            <select className='form-select' defaultValue="" {...register("pais", {
              required: {
                value: true,
                message: "El país de nacimiento es requerido"
              }
            })}>
              <option value="" disabled>Seleccione un país</option>
              <option value="Argentina">Argentina</option>
              <option value="Brasil">Brasil</option>
              <option value="Uruguay">Uruguay</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Chile">Chile</option>
              <option value="Mexico">México</option>
            </select>
          </div>
          {
            errors.pais && <span className='errores text-danger'>{errors.pais.message}</span>
          }
        </article>
        <article className='d-block'>
          <div className='mb-1'>
            <label className='form-label'>Provincia / Estado</label>
            <input type='text' className='form-control' placeholder='ej. Tucumán' {...register("provincia", {
              required: {
                value: true,
                message: "La provincia es requerida"
              },
              minLength: {
                value: 5,
                message: "La provincia debe tener al menos 5 caracteres"
              },
              maxLength: {
                value: 20,
                message: "La provincia no debe tener más de 20 caracteres"
              }
            })} maxLength="20"/>
          </div>
          {
            errors.provincia && <span className='errores text-danger'>{errors.provincia.message}</span>
          }
          <div className='mb-1'>
            <label className='form-label'>Código Postal</label>
            <input type='number' className='form-control' placeholder='ej. 4000' {...register("codigoPostal", {
              required: {
                value: true,
                message: "El código postal es requerido"
              },
              minLength: {
                value: 3,
                message: "El código postal debe tener al menos 3 caracteres"
              },
              maxLength: {
                value: 8,
                message: "El código postal no debe tener más de 8 caracteres"
              }
            })} maxLength="8"/>
          </div>
          {
            errors.codigoPostal && <span className='errores text-danger'>{errors.codigoPostal.message}</span>
          }
          <div className='mb-1'>
            <label className='form-label'>N°Telefono</label>
            <input type='number' className='form-control' placeholder='ej. 3814345653' {...register("telefono", {
              required: {
                value: true,
                message: "El número de teléfono es requerido"
              },
              minLength: {
                value: 10,
                message: "El número de teléfono debe tener al menos 10 caracteres"
              },
              maxLength: {
                value: 15,
                message: "El número de teléfono no debe tener más de 15 caracteres"
              }
            })} maxLength="15"/>
          </div>
          {
            errors.telefono && <span className='errores text-danger'>{errors.telefono.message}</span>
          }
          <div className='mb-1'>
            <label className='form-label'>Contraseña</label>
            <input type='password' className='form-control' placeholder='ej. Pepito123*' {...register("contraseña", {
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
            errors.contraseña && <span className='errores text-danger'>{errors.contraseña.message}</span>
          }
          <div className='mb-1'>
            <label className='form-label'>Repetir Contraseña</label>
            <input type='password' className='form-control' placeholder='ej. Pepito123*' {...register("repContraseña", {
              required: {
                value: true,
                message: "Repetir contraseña es requerida"
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
              },
              validate: (value) => value === watch('contraseña') || 'Las contraseñas no coinciden'
            })}/>
          </div>
          {
            errors.repContraseña && <span className='errores text-danger'>{errors.repContraseña.message}</span>
          }
        </article>
        <span className='link fs-6'>¿Ya tienes una cuenta? <Link to="/inicioSesion">Inicia Sesión</Link></span>
        {
          registro ?
          <div className="spinnerRegistro spinner-border" role="status"></div>
          :
          <div className='mt-4'>
            <button type='submit' className='botonRegistro btn btn-dark'>Crear Cuenta</button>
          </div>
        }
      </form>
    </div>
  )
}