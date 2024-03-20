import { ModalAgregarUsuario } from "../../../Components/ModalAgregarUsuario/ModalAgregarUsuario";
import { NavbarPagina } from "../../../Components/Navbar/NavbarPagina"
import { TablaUsuarios } from "../../../Components/TablaUsuarios/TablaUsuarios"
import Button from 'react-bootstrap/Button';
import './adminUsuarios.css'
import { useState } from 'react'
import { Footer } from "../../../Components/Footer/Footer";

export const AdminUsuarios = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavbarPagina/>
      <div className="adminUsuarios">
        <h2 className="text-center mt-3">Administración de Usuarios</h2>
        <article className="mx-4 mb-4">
          <Button type="button" variant="outline" onClick={handleShow} className="botonAgregarUsuario">Agregar Usuario</Button>
          <TablaUsuarios />
        </article>
        <ModalAgregarUsuario show={show} handleClose = {handleClose}/>
        <Footer />
      </div>
    </>
  )
}
