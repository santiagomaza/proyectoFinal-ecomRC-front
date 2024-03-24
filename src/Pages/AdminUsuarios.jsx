import { ModalAgregarUsuario } from "../Components/ModalAgregarUsuario";
import { NavbarPagina } from "../Components/NavbarPagina"
import { TablaUsuarios } from "../Components/TablaUsuarios"
import Button from 'react-bootstrap/Button';
import '../styles/adminUsuarios.css'
import { useState, useEffect } from 'react'
import { Footer } from "../Components/Footer";
import axios from "axios"

export const AdminUsuarios = () => {
  const [show, setShow] = useState(false);
  const [usuario, setUsuario] = useState({})
  const idUsuario = localStorage.getItem("idUsuario");

  useEffect(() => {
    if(idUsuario){
      const obtenerUsuario = async () => {
        const respuesta = await axios.get(`http://localhost:8000/usuarios/${idUsuario}`);
        setUsuario(respuesta.data.usuario);
      }

      obtenerUsuario()
    }
  }, [])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavbarPagina/>
      <div className="adminUsuarios">
        <h2 className="text-center mt-3">Administración de Usuarios</h2>
        <article className="mx-4 mb-4">
          {
            usuario.estado === "Pendiente" ? 
            <Button type="button" variant="outline" onClick={handleShow} className="botonAgregarUsuario" disabled>Agregar Usuario</Button>
            :
            usuario.estado === "Activo" ?
            <Button type="button" variant="outline" onClick={handleShow} className="botonAgregarUsuario">Agregar Usuario</Button>
            :
            null
          }
          <TablaUsuarios />
        </article>
        <ModalAgregarUsuario show={show} handleClose = {handleClose}/>
        <Footer />
      </div>
    </>
  )
}
