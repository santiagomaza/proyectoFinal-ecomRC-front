import { useState } from 'react';
import { ModalEditarProducto } from './ModalEditarProducto';

const BotonEditarProducto = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-primary btn-sm me-1" onClick={handleShow}>
        <i className="bi bi-pen-fill"></i>
      </button>

      <ModalEditarProducto show = {show} handleClose = {handleClose}/>
    </>
  )
}

export default BotonEditarProducto