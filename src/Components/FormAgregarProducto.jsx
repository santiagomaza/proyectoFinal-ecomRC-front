import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2'
import '../styles/formAgregarProducto.css'

export const FormAgregarProducto = () => {
  const [categorias, setCategorias] = useState([])
  const [registroProducto, setRegistroProducto] = useState(false)
  const navigate = useNavigate()
  const URL_BACK = import.meta.env.VITE_URL_BACKEND

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const obtenerCategorias = async () => {
      const respuesta = await axios.get(`${URL_BACK}/categorias/obtener-categorias`)
      setCategorias(respuesta.data)
    }

    obtenerCategorias()
  }, [])

  const filtrarCategorias = categorias.filter((categoria) => categoria.publicada === true)

  const agregarProducto = async (data) => {
    setRegistroProducto(true)
    const respuesta = await axios.post(`${URL_BACK}/productos/crear-producto`, data)

    if(respuesta.data.status === 201){
      setRegistroProducto(false)

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
    else if(respuesta.data.status === 400){
      setRegistroProducto(false)

      Swal.fire({
        icon: 'error',
        title: respuesta.data.message,
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  return (
    <form className="mt-1 mx-5" onSubmit={handleSubmit(agregarProducto)}>
      <div className="d-flex flex-wrap justify-content-evenly">
        <article className='mt-2'>
          <div className="mb-1">
            <label className="form-label">Nombre del Producto</label>
            <input
              type="text"
              className="form-control"
              autoComplete="off"
              placeholder="Nombre del producto"
              {...register("nombre", {
                required: {
                  value: true,
                  message: "El nombre es requerido"
                },
                minLength: {
                  value: 5,
                  message: "El nombre debe tener al menos 5 caracteres",
                },
                maxLength: {
                  value: 60,
                  message: "El nombre no debe tener más de 60 caracteres",
                },
              })}
            />
          </div>
          {
            errors.nombre && <span className='errores text-danger'>{errors.nombre.message}</span>
          }
          <div className="mb-1">
            <label className="form-label">Precio</label>
            <input
              type="number"
              className="form-control"
              autoComplete="off"
              placeholder="Precio"
              {...register("precio", {
                required: {
                  value: true,
                  message: "El precio es requerido"
                }
              })}
            />
          </div>
          {
            errors.precio && <span className='errores text-danger'>{errors.precio.message}</span>
          }
          <div className="mb-1">
            <label className="form-label">Stock</label>
            <input
              type="number"
              className="form-control"
              autoComplete="off"
              placeholder="Stock"
              {...register("stock", {
                required: {
                  value: true,
                  message: "El stock es requerido"
                }
              })}
            />
          </div>
          {
            errors.stock && <span className='errores text-danger'>{errors.stock.message}</span>
          }
          <div className="mb-1">
            <label className="form-label">Categoria</label>
            <select defaultValue="" className='form-select' {...register("categoria" , {
              required: {
                value: true,
                message: "La categoria es requerida",
              },
            })}>
              <option value="" disabled>Seleccione una categoria</option>
              {
                filtrarCategorias.map((categoria) => (
                  
                  <option key={categoria._id} value={categoria.categoria}>{categoria.categoria}</option>
                ))
              }
            </select>
          </div>
          {
            errors.categoria && <span className='errores text-danger'>{errors.categoria.message}</span>
          }
        </article>
        <article>
          <div className="mb-1">
            <label className="form-label">Descripción</label>
            <textarea
              className="form-control"
              autoComplete="off"
              placeholder="Descripción"
              maxLength={560}
              {...register("descripcion", {
                required: {
                  value: true,
                  message: "La descripción es requerida"
                },
                minLength:{
                  value: 2,
                  message: "La descripción debe tener al menos 2 caracteres",
                },
                maxLength: {
                  value: 560,
                  message: "La descripción no puede tener más de 560 caracteres"
                }
              })}
            ></textarea>
          </div>
          {
            errors.descripcion && <span className='errores text-danger'>{errors.descripcion.message}</span>
          }
          <div className="mb-1">
            <label className="form-label">Imagen 1</label>
            <input
              type="url"
              className="form-control"
              autoComplete="off"
              placeholder="Imagen"
              {...register("imagen1", {
                required: {
                  value: true,
                  message: "La imagen es requerida"
                }
              })}
            />
          </div>
          {
            errors.imagen1 && <span className='errores text-danger'>{errors.imagen1.message}</span>
          }
          <div className="mb-1">
            <label className="form-label">Imagen 2</label>
            <input
              type="url"
              className="form-control"
              autoComplete="off"
              placeholder="Imagen"
              {...register("imagen2", {
                required: {
                  value: true,
                  message: "La imagen es requerida"
                }
              })}
            />
          </div>
          {
            errors.imagen2 && <span className='errores text-danger'>{errors.imagen2.message}</span>
          }
          <div className="mb-1">
            <label className="form-label">Imagen 3</label>
            <input
              type="url"
              className="form-control"
              autoComplete="off"
              placeholder="Imagen"
              {...register("imagen3", {
                required: {
                  value: true,
                  message: "La imagen es requerida"
                }
              })}
            />
          </div>
          {
            errors.imagen3 && <span className='errores text-danger'>{errors.imagen3.message}</span> 
          }
        </article>
      </div>
      {
        registroProducto ?
        <div className='d-flex justify-content-center'>
          <div className="spinner-border" role="status"></div>
        </div>
        :
        <div className='d-flex justify-content-end'>
          <button type='submit' className='btn btn-transparent botonAgregarUsuario'>Agregar Producto</button>
        </div>
      }
    </form>
  )
}