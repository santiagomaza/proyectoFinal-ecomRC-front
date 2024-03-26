import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

export const FormCrearCategoría = () => {
  const [creandoCategoria, setCreandoCategoria] = useState(false)
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm();

  const crearCategoria = async (data) => {
    setCreandoCategoria(true)
    const respuesta = await axios.post("https://proyectofinal-ecomrc-back.onrender.com/categorias/crear-categoria", data)

    if(respuesta.data.status === 201){
      setCreandoCategoria(false)

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

    if(respuesta.data.status === 400){
      setCreandoCategoria(false)

      Swal.fire({
        icon: 'error',
        title: respuesta.data.message,
        showConfirmButton: true
      })
    }
  }

  return (
    <form className="mt-1 mx-5" onSubmit={handleSubmit(crearCategoria)}>
      <div className="mb-1">
        <label htmlFor="" className="form-label">Nombre de la Categoria</label>
        <input type="text" id="" className="form-control" placeholder="ej. Electrodomesticos" {...register("categoria", {
          required: {
            value: true,
            message: "El nombre de la categoria es requerido"
          },
          minLength: {
            value: 5,
            message: "El nombre de la categoria debe tener al menos 5 caracteres"
          },
          maxLength: {
            value: 20,
            message: "El nombre de la categoria no debe tener más de 20 caracteres"
          }
        })}/>
      </div>
      {
        errors.categoria && <span className='errores text-danger'>{errors.categoria.message}</span>
      }
      <div className="mb-1">
        <label htmlFor="" className="form-label">Descripción de la Categoría</label>
        <textarea className="form-control" id="" cols="30" rows="5" placeholder="Agregar una descripción" {...register("descripcion", {
          required: {
            value: true,
            message: "La descripción es requerida"
          },
          minLength: {
            value: 8,
            message: "La descripción debe tener al menos 8 caracteres"
          },
          maxLength: {
            value: 200,
            message: "La descripción no debe tener más de 200 caracteres"
          }
        })}></textarea>
      </div>
      {
        errors.descripcion && <span className='errores text-danger'>{errors.descripcion.message}</span>
      }
      <div className="mb-1">
        <label htmlFor="" className="form-label">Publicar Categoría</label>
        <select defaultValue="" className="form-select" aria-label="Default select example" {...register("publicada", {
          required: {
            value: true,
            message: "La publicación es requerida"
          }
        })}>
          <option value="" disabled>Publicar Categoría</option>
          <option value={true}>Si</option>
          <option value={false}>No</option>
        </select>
      </div>
      {
        errors.publicada && <span className='errores text-danger'>{errors.publicada.message}</span>
      }
      {
        creandoCategoria ? 
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status"></div>
        </div>
        :
        <div className="d-flex justify-content-end">
          <button className="btn btn-transparent botonAgregarUsuario">Agregar Categoría</button>
        </div>
      }
    </form>
  )
}
