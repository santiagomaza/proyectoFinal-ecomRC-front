import { NavbarPagina } from "../Components/NavbarPagina"
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
import '../styles/adminProductos.css'
import { ModalAgregarProducto } from "../Components/ModalAgregarProducto";
import { TablaProductos } from "../Components/TablaProductos";
import { Footer } from "../Components/Footer";

export const AdminProductos = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavbarPagina />
      <div className="adminProductos">
        <h2 className="text-center mt-3">Administración de Productos</h2>
        <article className="mx-5">
          <Button type="button" variant="outline" onClick={handleShow} className="botonAgregarProducto">Agregar Productos</Button>
          <TablaProductos />
        </article>
        <ModalAgregarProducto show = {show} handleClose = {handleClose}/>
      </div>
      <Footer />
    </>
  )
}
