import { useForm } from "react-hook-form";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export const FormCrearUsuario = () => {
  const navigate = useNavigate()
  const [registro, setRegistro] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const crearUsuario = async (data) => {
    setRegistro(true)

    const respuesta = await axios.post("https://proyectofinal-ecomrc-back.onrender.com/usuarios/crear-usuario", data)
    console.log(respuesta.data)

    if(respuesta.data.status === 201){
      setRegistro(false)

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
      setRegistro(false)

      Swal.fire({
        icon: 'error',
        title: respuesta.data.message,
        showConfirmButton: true,
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(crearUsuario)}
      className="formularioCrearUsuario mt-1 mx-5"
    >
      <div className="d-flex flex-wrap justify-content-evenly">
        <article className="">
          <div className="mb-1">
            <label className="form-label">Nombre Completo</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              autoComplete="off"
              placeholder="ej. Santiago Maza"
              {...register("nombre", {
                required: {
                  value: true,
                  message: "El nombre es requerido",
                },
                minLength: {
                  value: 5,
                  message: "El nombre debe tener al menos 5 caracteres",
                },
                maxLength: {
                  value: 30,
                  message: "El nombre no debe tener más de 30 caracteres",
                },
              })}
            />
          </div>
          {errors.nombre && (
            <span className="errores text-danger">{errors.nombre.message}</span>
          )}
          <div className="mb-1">
            <label className="form-label">Nombre de Usuario</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="ej. santimaza99"
              {...register("username", {
                required: {
                  value: true,
                  message: "El nombre de usuario es requerido",
                },
                minLength: {
                  value: 5,
                  message:
                    "El nombre de usuario debe tener al menos 5 caracteres",
                },
                maxLength: {
                  value: 15,
                  message:
                    "El nombre de usuario no debe tener más de 15 caracteres",
                },
              })}
            />
          </div>
          {errors.username && (
            <span className="errores text-danger">{errors.username.message}</span>
          )}
          <div className="mb-1">
            <label className="form-label">Domicilio</label>
            <input
              type="text"
              name="domicilio"
              className="form-control"
              placeholder="ej. Av Belgrano 1550"
              {...register("domicilio", {
                required: {
                  value: true,
                  message: "El domicilio es requerido",
                },
                minLength: {
                  value: 8,
                  message: "El domicilio debe tener al menos 8 caracteres",
                },
                maxLength: {
                  value: 60,
                  message: "El domicilio no debe tener más de 60 caracteres",
                },
              })}
            />
          </div>
          {errors.domicilio && (
            <span className="errores text-danger">
              {errors.domicilio.message}
            </span>
          )}
          <div className="mb-1">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="ej. pepito45@gmail.com"
              {...register("email", {
                required: {
                  value: true,
                  message: "El email es requerido",
                },
                minLength: {
                  value: 4,
                  message: "El email debe tener al menos 4 caracteres",
                },
                maxLength: {
                  value: 30,
                  message: "El email no debe tener más de 30 caracteres",
                },
              })}
            />
          </div>
          {errors.email && (
            <span className="errores text-danger">{errors.email.message}</span>
          )}
          <div className="mb-1">
            <label className="form-label">País de Nacimiento</label>
            <select
              className="form-select"
              name="pais"
              defaultValue=""
              {...register("pais", {
                required: {
                  value: true,
                  message: "El país de nacimiento es requerido",
                },
              })}
            >
              <option value="" disabled>
                Seleccione un país
              </option>
              <option value="Argentina">Argentina</option>
              <option value="Brasil">Brasil</option>
              <option value="Uruguay">Uruguay</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Chile">Chile</option>
              <option value="Mexico">México</option>
            </select>
          </div>
          {errors.pais && (
            <span className="errores text-danger">{errors.pais.message}</span>
          )}
        </article>
        <article className="d-block">
          <div className="mb-1">
            <label className="form-label">Provincia / Estado</label>
            <input
              type="text"
              name="provincia"
              className="form-control"
              placeholder="ej. Tucumán"
              {...register("provincia", {
                required: {
                  value: true,
                  message: "La provincia es requerida",
                },
                minLength: {
                  value: 5,
                  message: "La provincia debe tener al menos 5 caracteres",
                },
                maxLength: {
                  value: 20,
                  message: "La provincia no debe tener más de 20 caracteres",
                },
              })}
              maxLength="20"
            />
          </div>
          {errors.provincia && (
            <span className="errores text-danger">
              {errors.provincia.message}
            </span>
          )}
          <div className="mb-1">
            <label className="form-label">Código Postal</label>
            <input
              type="number"
              className="form-control"
              name="codigoPostal"
              placeholder="ej. 4000"
              {...register("codigoPostal", {
                required: {
                  value: true,
                  message: "El código postal es requerido",
                },
                minLength: {
                  value: 3,
                  message: "El código postal debe tener al menos 3 caracteres",
                },
                maxLength: {
                  value: 8,
                  message: "El código postal no debe tener más de 8 caracteres",
                },
              })}
              maxLength="8"
            />
          </div>
          {errors.codigoPostal && (
            <span className="errores text-danger">
              {errors.codigoPostal.message}
            </span>
          )}
          <div className="mb-1">
            <label className="form-label">N°Telefono</label>
            <input
              type="number"
              className="form-control"
              name="telefono"
              placeholder="ej. 3814345653"
              {...register("telefono", {
                required: {
                  value: true,
                  message: "El número de teléfono es requerido",
                },
                minLength: {
                  value: 10,
                  message:
                    "El número de teléfono debe tener al menos 10 caracteres",
                },
                maxLength: {
                  value: 15,
                  message:
                    "El número de teléfono no debe tener más de 15 caracteres",
                },
              })}
              maxLength="15"
            />
          </div>
          {errors.telefono && (
            <span className="errores text-danger">{errors.telefono.message}</span>
          )}
          <div className="mb-1">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              name="contraseña"
              placeholder="ej. Pepito123*"
              {...register("contraseña", {
                required: {
                  value: true,
                  message: "La contraseña es requerida",
                },
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
                maxLength: {
                  value: 15,
                  message: "La contraseña no debe tener más de 15 caracteres",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*._-])(?=.{8,})/,
                  message:
                    "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial",
                },
              })}
              maxLength="15"
            />
          </div>
          {errors.contraseña && (
            <span className="errores text-danger">
              {errors.contraseña.message}
            </span>
          )}
          <div className="mb-1">
            <label className="form-label">Repetir Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="ej. Pepito123*"
              {...register("repContraseña", {
                required: {
                  value: true,
                  message: "Repetir contraseña es requerida",
                },
                validate: (value) =>
                  value === watch("contraseña") || "Las contraseñas no coinciden",
              })}
            />
          </div>
          {errors.repContraseña && (
            <span className="errores text-danger">
              {errors.repContraseña.message}
            </span>
          )}
        </article>
        <article>
          <div className="mb-1">
            <label className="form-label">Rol</label>
            <select
              className="form-select"
              name="rol"
              defaultValue=""
              {...register("rol", {
                required: {
                  value: true,
                  message: "El rol es requerido",
                },
              })}
            >
              <option value="" disabled>
                Seleccione el rol
              </option>
              <option value="admin">Administrador</option>
              <option value="usuario">Usuario</option>
            </select>
          </div>
          {
            errors.rol && <span className="errores text-danger">{errors.rol.message}</span>
          }
          <div className="mb-1">
            <label className="form-label">Estado</label>
            <select
              className="form-select"
              name="estado"
              defaultValue=""
              {...register("estado", {
                required: {
                  value: true,
                  message: "El estado es requerido",
                },
              })}
            >
              <option value="" disabled>
                Seleccione el estado
              </option>
              <option value="Activo">Activo</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          {
            errors.estado && <span className="errores text-danger">{errors.estado.message}</span>
          }
        </article>
      </div>
      {
        registro ?
        <div className="d-flex justify-content-center">
          <div className="spinnerRegistro spinner-border" role="status"></div>
        </div>
        :
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-transparent botonAgregarUsuario">Agregar Usuario</button>
        </div>
      }
    </form>
  );
};
