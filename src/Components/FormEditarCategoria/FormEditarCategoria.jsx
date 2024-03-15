import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

export const FormEditarCategoria = ({ idCategoria, nombre, descripcion }) => {
  const [editandoCategoria, setEditandoCategoria] = useState(false)
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm();

  const editarCategoria = (data) => {
    Swal.fire({
      title: `¿Estás seguro de que quieres editar la categoria ${nombre}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, editar!",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if(result.isConfirmed){
        setEditandoCategoria(true)

        const respuesta = await axios.patch("http://localhost:8000/categorias/modificar-categoria", {
          id: idCategoria,
          categoria: data.categoria,
          descripcion: data.descripcion
        })

        if(respuesta.data.status === 200){
          setEditandoCategoria(false)

          Swal.fire({
            icon: "success",
            title: respuesta.data.message,
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
    <form className="mt-1 mx-5" onSubmit={handleSubmit(editarCategoria)}>
      <div className="mb-1">
        <label htmlFor="" className="form-label">Nombre de la Categoria</label>
        <input type="text" id="" className="form-control" placeholder="ej. Electrodomesticos" defaultValue={nombre} {...register("categoria", {
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
        <textarea className="form-control" id="" cols="30" rows="5" defaultValue={descripcion} placeholder="Agregar una descripción" {...register("descripcion", {
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
      {
        editandoCategoria ? 
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status"></div>
        </div>
        :
        <div className="d-flex justify-content-end">
          <button className="btn btn-transparent border border-primary text-primary">Editar Categoria</button>
        </div>
      }
    </form>
  )
}
