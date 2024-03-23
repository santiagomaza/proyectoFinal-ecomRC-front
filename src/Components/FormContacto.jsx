import '../styles/formContacto.css'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export const FormContacto = () => {
  const navigate = useNavigate()
  const servicio_emailJS = import.meta.env.VITE_SERVICEID_EMAILJS
  const template_emailJS = import.meta.env.VITE_TEMPLATE_EMAILJS
  const clave_emailJS = import.meta.env.VITE_KEY_EMAILJS

  const form = useRef();

  const contacto = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(servicio_emailJS, template_emailJS, form.current, {
        publicKey: clave_emailJS,
      })
      .then(
        () => {
          Swal.fire({
            icon:'success',
            title: 'Mensaje Enviado correctamente',
            showConfirmButton: false,
            timer: 1500
          })

          setTimeout(() => {
            navigate(0)
          }, 1500);
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: error.text,
            showConfirmButton: false,
            timer: 1500
          })
        },
      );
  }

  return (
    <div className="contenedorFormContacto">
      <form className='p-3 formContacto' ref={form} onSubmit={contacto}>
        <div>
          <label htmlFor="username" className='d-block'>Nombre Completo:</label>
          <input type="text" autoComplete='off' className='mt-2 w-100' id="username" name="username" minLength="5" maxLength="35" required/>
        </div>
        <div>
          <label htmlFor="email" className='d-block'>Email:</label>
          <input type="email" autoComplete='off' className='mt-2 w-100' id="email" name="email" minLength="5" maxLength="35" required/>
        </div>
        <div>
          <label htmlFor="asunto" className='d-block'>Asunto:</label>
          <input type="text" autoComplete='off' className='mt-2 w-100' id="asunto" name="asunto" minLength="3" maxLength="50" required/>
        </div>
        <div>
          <label htmlFor="mensaje" className='d-block'>Mensaje:</label>
          <textarea type="text" className='mt-2 w-100' cols="10" rows="10" id="mensaje" name="mensaje" minLength="5" required/>
        </div>
        <button type='submit' className='btn botonContacto'><strong>Enviar mensaje</strong></button>
      </form>
    </div>
  )
}
