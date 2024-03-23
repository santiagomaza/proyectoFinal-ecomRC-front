import { useState } from 'react';
import { ModalEditarProducto } from './ModalEditarProducto';

const BotonEditarProducto = ({ idProducto, nombre, precio, stock, categoriaProd, descripcion, imagen1, imagen2, imagen3 }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-primary btn-sm me-1" onClick={handleShow}>
        <i className="bi bi-pen-fill"></i>
      </button>

      <ModalEditarProducto 
      show = {show} 
      handleClose = {handleClose}
      idProducto = {idProducto}
      nombre = {nombre}
      precio = {precio}
      stock = {stock}
      categoriaProd = {categoriaProd}
      descripcion = {descripcion}
      imagen1 = {imagen1}
      imagen2 = {imagen2}
      imagen3 = {imagen3} 
      />
    </>
  )
}

export default BotonEditarProducto