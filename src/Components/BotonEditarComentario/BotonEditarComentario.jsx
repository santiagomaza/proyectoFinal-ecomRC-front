import { ModalEditarComentario } from "../ModalEditarComentario/ModalEditarComentario"
import { useState } from 'react';

export const BotonEditarComentario = ({ id, mensaje }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-transparent bg-transparent" onClick={handleShow}>
        <i className="bi bi-pen text-primary"></i>
      </button>

      <ModalEditarComentario id = {id} mensaje = {mensaje} show = {show} handleClose = {handleClose}/>
    </>
  )
}
