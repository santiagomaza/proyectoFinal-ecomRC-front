import { NavbarPagina } from "../../../Components/Navbar/NavbarPagina"
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
import './adminProductos.css'
import { ModalAgregarProducto } from "../../../Components/ModalAgregarProducto/ModalAgregarProducto";
import { TablaProductos } from "../../../Components/TablaProductos/TablaProductos";

export const AdminProductos = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavbarPagina />
      <h2 className="text-center mt-3">Administración de Productos</h2>
      <article className="mx-5">
        <Button type="button" variant="outline" onClick={handleShow} className="botonAgregarProducto">Agregar Productos</Button>
        <TablaProductos />
      </article>
      <ModalAgregarProducto show = {show} handleClose = {handleClose}/>
    </>
  )
}
