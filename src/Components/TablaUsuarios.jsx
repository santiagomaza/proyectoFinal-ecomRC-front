import { useState, useEffect } from 'react'
import axios from 'axios'
import { BotonEditarUsuario } from './BotonEditarUsuario'
import { BotonEliminarUsuario } from './BotonEliminarUsuario'
import { createContext } from 'react' 

export const DatoUsuarioContext = createContext()

export const TablaUsuarios = () => {

  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    const obtenerUsuarios = async () => {
      const respuesta = await axios.get("https://proyectofinal-ecomrc-back.onrender.com/usuarios/obtener-usuarios")
      setUsuarios(respuesta.data.usuario)
    }

    obtenerUsuarios()
  }, [])

  return (
    <div className='table-responsive'>
      <table className="table table-bordered align-middle text-center mt-4">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre Completo</th>
            <th scope="col">Nombre de Usuario</th>
            <th scope="col">Email</th>
            <th scope="col">País</th>
            <th scope="col">Estado</th>
            <th scope="col">Rol</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {
            usuarios.map((usuario) => (
              <tr key={usuario._id}>
                <th scope="row">{usuario._id}</th>
                <td>{usuario.nombre}</td>
                <td>{usuario.username}</td>
                <td>{usuario.email}</td>
                <td>{usuario.pais}</td>
                {
                  usuario.estado === 'Activo'?
                  <td>
                    <span className="badge bg-success">{usuario.estado}</span>
                  </td>
                  :
                  usuario.estado === "Pendiente" ?
                  <td>
                    <span className="badge bg-warning text-dark">{usuario.estado}</span>
                  </td>
                  :
                  <td>
                    <span className="badge bg-danger">{usuario.estado}</span>
                  </td>
                }
                {
                  usuario.rol === 'admin'?
                  <td className='text-danger fw-bold fst-italic'>{usuario.rol}</td>
                  :
                  <td className='text-info fw-bold fst-italic'>{usuario.rol}</td>
                }
                <td className='d-flex justify-content-evenly'>
                  <DatoUsuarioContext.Provider value={{usuario}}>
                    <BotonEditarUsuario />
                  </DatoUsuarioContext.Provider>
                  <BotonEliminarUsuario idUsuario = {usuario._id} nombre = {usuario.nombre} usuario = {usuario.username}/>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
