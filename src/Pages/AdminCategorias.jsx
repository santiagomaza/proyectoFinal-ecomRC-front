import { NavbarPagina } from "../Components/NavbarPagina"
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react'
import { ModalAgregarCategoria } from "../Components/ModalAgregarCategoria";
import { TablaCategorias } from "../Components/TablaCategorias";
import { Footer } from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const AdminCategorias = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({})

  const idUsuario = localStorage.getItem("idUsuario");

  useEffect(() => {
    if(idUsuario){
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
