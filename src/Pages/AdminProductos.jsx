import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { NavbarPagina } from "../Components/NavbarPagina"
import { ModalAgregarProducto } from "../Components/ModalAgregarProducto";
import { TablaProductos } from "../Components/TablaProductos";
import { Footer } from "../Components/Footer";
import axios from 'axios'
import '../styles/adminProductos.css'

export const AdminProductos = () => {
  const [show, setShow] = useState(false);
  const [usuario, setUsuario] = useState({})
  const idUsuario = sessionStorage.getItem("idUsuario");
  const navigate = useNavigate()
  const URL_BACK = import.meta.env.VITE_URL_BACKEND

  useEffect(() => {
    if(idUsuario){
      const obtenerUsuario = async () => {
        const respuesta = await axios.get(`${URL_BACK}/usuarios/${idUsuario}`);
        setUsuario(respuesta.data.usuario);
      }

      obtenerUsuario()
    }
  }, [idUsuario])

  useEffect(() => {
    if(!idUsuario || (idUsuario && usuario.rol === "usuario")){
      navigate("/", {replace: true})
    }
  }, [idUsuario, usuario.rol, navigate])

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
