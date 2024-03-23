import { NavbarPagina } from "../Components/NavbarPagina"
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
import { ModalAgregarCategoria } from "../Components/ModalAgregarCategoria";
import { TablaCategorias } from "../Components/TablaCategorias";
import { Footer } from "../Components/Footer";

export const AdminCategorias = () => {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavbarPagina />
      <div className="adminCategorias">
        <h2 className="text-center mt-3">Administración de Categorías</h2>
        <article className="mx-5">
          <Button type="button" variant="outline" onClick={handleShow} className="botonAgregarProducto">Agregar Categoria</Button>
          <TablaCategorias />
        </article>
        <ModalAgregarCategoria show = {show} handleClose = {handleClose}/>
      </div>
      <Footer />
    </>
  )
}
