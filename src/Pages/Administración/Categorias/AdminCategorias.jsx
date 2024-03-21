import { NavbarPagina } from "../../../Components/Navbar/NavbarPagina"
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
import { ModalAgregarCategoria } from "../../../Components/ModalAgregarCategoria/ModalAgregarCategoria";
import { TablaCategorias } from "../../../Components/TablaCategorias/TablaCategorias";
import { Footer } from "../../../Components/Footer/Footer";

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
