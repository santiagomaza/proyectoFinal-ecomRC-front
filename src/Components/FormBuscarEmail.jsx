import logoeComRC from '../assets/ecom.jpg'
import '../styles/formBuscarEmail.css'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Alert from 'react-bootstrap/Alert';

export const FormBuscarEmail = () => {
  const [emailEncontrado, setEmailEncontrado] = useState(null)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const buscarEmail = async (data) => {
    const respuesta = await axios.post("http://localhost:8000/usuarios/buscar-email", data)

    if(respuesta.data.status === 200){
      setEmailEncontrado(true)

      localStorage.setItem('email', respuesta.data.usuario.email)
      localStorage.setItem('tokenRecContraseña', respuesta.data.token)
      localStorage.setItem('idUsuario', respuesta.data.usuario._id)
    }
    else if(respuesta.data.status === 400){
      setEmailEncontrado(false)
    }
  }

  return (
    <div className="contenedorFormBuscarEmail border border-dark">
      <Link to="/">
        <img src={logoeComRC} alt="logoeComRC" style={{height: "100px", width: "100px"}} className='m-3 rounded-circle'/>
      </Link>
      <h2 className='text-center tituloBuscarEmail'>Busca tu email</h2>
      <div className={emailEncontrado ? "ocultar" : 'mx-5 text-center'}>
        <small className='infoBE'>Para poder recuperar tu contraseña es necesario que proporciones tu email. Te enviaremos un correo. Se te informará con un cartel en caso de que no se pueda encontrar el correo ingresado</small>
      </div>
      <form className={emailEncontrado ? "ocultar": 'formularioBE w-50'} onSubmit={handleSubmit(buscarEmail)}>
        <div>
          <label className='form-label etiquetas'>Email</label>
          <i className="bi bi-envelope-at-fill iconos fs-2"></i>
          <input type="email" autoComplete='off' className="form-control inputBE" placeholder="ej. pepito.rc@gmail.com" {...register("email", {
            required: {
              value: true,
              message: "El email es requerido"
            }
          })}/>
        </div>
        {
          errors.email && <span className='text-danger errores'>{errors.email.message}</span>
        }
        <div className='mt-3 d-flex justify-content-center'>
          <button type="submit" className="btn btn-dark">Buscar</button>
        </div>
      </form>
      <div className={emailEncontrado === false ? 'd-flex justify-content-center': "ocultar"}>
        <Alert variant="danger" className='emailNoEncontrado w-75'><i className="bi bi-x-circle-fill me-2"></i>No se pudo encontrar el email proporcionado. Intentelo de nuevo</Alert>
      </div>
      <div className='d-flex justify-content-center'>
        <Alert className={emailEncontrado ? 'w-75 alertaPrueba': "ocultar"} variant="success"><i className="bi bi-check-circle-fill mx-2"></i>Correo enviado correctamente. Por favor, revisa tu casilla de correo electrónico, incluido el spam. El correo proporcionado tendrá un enlace con el cual podrás recuperar tu contraseña</Alert>
      </div>
      <div className={emailEncontrado ? 'd-flex justify-content-center botonContinuar' : "ocultar"}>
        <Link to="/" replace = {true}>
          <button type='button' className='btn btn-dark'>Continuar</button>
        </Link>
      </div>
    </div>
  )
}
