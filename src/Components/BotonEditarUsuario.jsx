import { useState, useEffect } from 'react';
import { ModalEditarUsuario } from './ModalEditarUsuario';
import axios from 'axios'

export const BotonEditarUsuario = (props) => {
  const [show, setShow] = useState(false);
  const [usuario, setUsuario] = useState({})
  const idUsuario = localStorage.getItem("idUsuario");

  useEffect(() => {
    if(idUsuario){
      const obtenerUsuario = async () => {
        const respuesta = await axios.get(`http://localhost:8000/usuarios/${idUsuario}`);
        setUsuario(respuesta.data.usuario);
      }

      obtenerUsuario()
    }
  }, [])


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {
        usuario.estado === "Pendiente" ?
        <button className="btn btn-primary btn-sm" onClick={handleShow} disabled>
          <i className="bi bi-pen-fill"></i>
        </button>
        :
        usuario.estado === "Activo" ?
        <button className="btn btn-primary btn-sm" onClick={handleShow}>
          <i className="bi bi-pen-fill"></i>
        </button>
        :
        null
      }

      <ModalEditarUsuario 
      show = {show} 
      handleClose = {handleClose}
      idUsuario = {props.id}
      nombre = {props.nombre}
      username = {props.username}
      email = {props.email}
      pais = {props.pais}
      estado = {props.estado}
      rol = {props.rol}
      provincia = {props.provincia}
      codigoPostal = {props.codigoPostal}
      domicilio = {props.domicilio}
      telefono = {props.telefono} 
      />
    </>
  )
}
