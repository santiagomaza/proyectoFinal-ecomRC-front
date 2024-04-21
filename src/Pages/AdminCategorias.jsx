import { NavbarPagina } from "../Components/NavbarPagina"
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react'
import { ModalAgregarCategoria } from "../Components/ModalAgregarCategoria";
import { TablaCategorias } from "../Components/TablaCategorias";
import { Footer } from "../Components/Footer";
import axios from "axios"
import { useNavigate } from 'react-router-dom'

export const AdminCategorias = () => {
  const [show, setShow] = useState(false);
  const idUsuario = sessionStorage.getItem("idUsuario");
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState({})

  useEffect(() => {
    if(idUsuario){
      const obtenerUsuario = async () => {
        const respuesta = await axios.get(`https://proyectofinal-ecomrc-back.onrender.com/usuarios/${idUsuario}`);
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
