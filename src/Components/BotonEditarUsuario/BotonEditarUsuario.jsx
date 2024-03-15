import { useState } from 'react';
import { ModalEditarUsuario } from '../ModalEditatUsuario/ModalEditarUsuario';

export const BotonEditarUsuario = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-primary btn-sm" onClick={handleShow}>
        <i className="bi bi-pen-fill"></i>
      </button>

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
