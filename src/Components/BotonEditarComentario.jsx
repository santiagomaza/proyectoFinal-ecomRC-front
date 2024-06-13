import { useState } from 'react';
import { ModalEditarComentario } from "./ModalEditarComentario"

export const BotonEditarComentario = ({ id, mensaje }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-transparent border border-0 bg-transparent" onClick={handleShow}>
        <i className="bi bi-pen text-primary"></i>
      </button>

      <ModalEditarComentario id = {id} mensaje = {mensaje} show = {show} handleClose = {handleClose}/>
    </>
  )
}
