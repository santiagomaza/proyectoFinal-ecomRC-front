import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { DatoProductoContext } from './TablaProductos';

export const FormEditarProducto = () => {
  const [categorias, setCategorias] = useState([])
  const [edicionProducto, setEdicionProducto] = useState(false)
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token')

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { producto } = useContext(DatoProductoContext)

  useEffect(() => {
    const obtenerCategorias = async () => {
      const respuesta = await axios.get("https://proyectofinal-ecomrc-back.onrender.com/categorias/obtener-categorias")
      setCategorias(respuesta.data)
    }

    obtenerCategorias()
  }, [])

  const editarProducto = (data) => {
    Swal.fire({
      title: `¿Estás seguro de que quieres editar a ${producto.nombre}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, editar!",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if(result.isConfirmed){
        setEdicionProducto(true)

        const respuesta = await axios.patch("https://proyectofinal-ecomrc-back.onrender.com/productos/modificar-producto", {
          id: producto._id,
          nombre: data.nombre,
          precio: data.precio,
          stock: data.stock,
          categoria: data.categoria,
          descripcion: data.descripcion,
          imagen1: data.imagen1,
          imagen2: data.imagen2,
          imagen3: data.imagen3,
          accessToken: token
        })

        if(respuesta.data.status === 200){
          setEdicionProducto(false)

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
      }
    })
  }

  const filtrarCategorias = categorias.filter((categoria) => categoria.publicada === true)

  return (
    <form className="mt-1 mx-5" onSubmit={handleSubmit(editarProducto)}>
      <div className="d-flex flex-wrap justify-content-evenly">
        <article className='mt-2'>
          <div className="mb-1">
            <label className="form-label">Nombre del Producto</label>
            <input
              type="text"
              className="form-control"
              autoComplete="off"
              placeholder="Nombre del producto"
              defaultValue={producto.nombre}
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
              defaultValue={producto.precio}
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
              defaultValue={producto.stock}
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
            <select defaultValue={producto.categoria} className='form-select' {...register("categoria" , {
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
              defaultValue={producto.descripcion}
              {...register("descripcion", {
                required: {
                  value: true,
                  message: "La descripción es requerida"
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
              defaultValue={producto.imagen1}
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
              defaultValue={producto.imagen2}
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
              defaultValue={producto.imagen3}
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
        edicionProducto ?
        <div className='d-flex justify-content-center'>
          <div className="spinner-border" role="status"></div>
        </div>
        :
        <div className='d-flex justify-content-end'>
          <button type='submit' className='btn btn-transparent border border-primary text-primary'>Editar Producto</button>
        </div>
      }
    </form>
  )
}
