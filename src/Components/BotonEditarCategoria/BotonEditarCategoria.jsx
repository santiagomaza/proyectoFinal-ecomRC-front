import { useState } from 'react';
import { ModalEditarCategoria } from '../ModalEditarCategoria/ModalEditarCategoria';

export const BotonEditarCategoria = ({idCategoria, nombre, descripcion}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button type="button" className="btn btn-primary btn-sm me-1" onClick={handleShow}>
        <i className="bi bi-pen-fill"></i>
      </button>

      <ModalEditarCategoria show = {show} handleClose = {handleClose} idCategoria = {idCategoria} nombre = {nombre} descripcion = {descripcion}/>
    </>
  )
}
