import { NavbarPagina } from "../Components/NavbarPagina"
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react'
import '../styles/adminProductos.css'
import { ModalAgregarProducto } from "../Components/ModalAgregarProducto";
import { TablaProductos } from "../Components/TablaProductos";
import { Footer } from "../Components/Footer";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const AdminProductos = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState({})

  const idUsuario = localStorage.getItem("idUsuario");

  useEffect(() => {
    if(idUsuario) {
      const obtenerUsuario = async () => {
        const respuesta = await axios.get(`http://localhost:8000/usuarios/${idUsuario}`);
        setUsuario(respuesta.data);
      }
  
      obtenerUsuario()
    }
  }, [])

  useEffect(() => {
    if(!idUsuario) {
      navigate("/", { replace: true })
    }
    else if(idUsuario && usuario.rol === "usuario"){
      navigate("/", { replace: true })
    }
  }, [])

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
