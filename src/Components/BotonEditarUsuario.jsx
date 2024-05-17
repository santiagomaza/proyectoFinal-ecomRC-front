import { useState } from 'react';
import { ModalEditarUsuario } from './ModalEditarUsuario';

export const BotonEditarUsuario = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-primary btn-sm" onClick={handleShow}>
        <i className="bi bi-pen-fill"></i>
      </button>

      <ModalEditarUsuario show = {show} handleClose = {handleClose}/>
    </>
  )
}
