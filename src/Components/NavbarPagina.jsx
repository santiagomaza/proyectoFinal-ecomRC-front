import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { BarraBuscadoraNavbar } from './BarraBuscadoraNavbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Badge from 'react-bootstrap/Badge';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios'
import logoecomrc from '../assets/ecom.jpg'
import '../styles/navbar.css'

export const NavbarPagina = () => {
  const token = sessionStorage.getItem('token')
  const idUsuario = sessionStorage.getItem('idUsuario')
  const [usuario, setUsuario] = useState({})
  const [carrito, setCarrito] = useState([])
  const [favoritos, setFavoritos] = useState([])
  const URL_BACK = import.meta.env.VITE_URL_BACKEND

  useEffect(() => {
    if(idUsuario){
      const obtenerUsuarioEspecifico = async () => {
        const respuesta = await axios.get(`${URL_BACK}/usuarios/${idUsuario}`)
  
        setUsuario(respuesta.data.usuario)
      }
  
      obtenerUsuarioEspecifico()
    }
  }, [])

  useEffect(() => {
    const obtenerCarrito = async () => {
      const respuesta = await axios.get(`${URL_BACK}/carritos/obtener-carrito`)
      setCarrito(respuesta.data)
    }

    obtenerCarrito()
  }, [])

  const carritoUsuario = carrito.filter((cart) => cart.usuario === usuario.username)

  useEffect(() => {
    const obtenerFavoritos = async () => {
      const respuesta = await axios.get(`${URL_BACK}/favoritos/obtener-favoritos`)
      setFavoritos(respuesta.data)
    }

    obtenerFavoritos()
  }, [])

  const favoritosUsuario = favoritos.filter((favorito) => favorito.usuario === usuario.username)

  const renderTooltip = (props) => (
    <Tooltip id="tooltip" {...props}/>
  )
  
  return (
    <Navbar expand="lg" className="bg-warning flex-wrap">
      <Container>
        <Link to={"/"}>
          <img src={logoecomrc} alt="logoeComRC" className='logoEmpresa'/>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-4 me-5">
            <NavLink to={"https://www.instagram.com/"} className={"text-decoration-none text-dark"}><i className="bi bi-instagram mx-2 fs-3"></i></NavLink>
            <NavLink to={"/*"} className={"text-decoration-none text-dark"}><i className="bi bi-twitter mx-2 fs-3"></i></NavLink>
            <NavLink to={"https://www.linkedin.com/in/santiago-maza-5b4561258"} className={"text-decoration-none text-dark"}><i className="bi bi-linkedin mx-2 fs-3"></i></NavLink>
            <NavLink to={"https://github.com/santiagomaza"} className={"text-decoration-none text-dark"}><i className="bi bi-github mx-2 fs-3"></i></NavLink>
          </Nav>
          <BarraBuscadoraNavbar/>
          {
            !token ?
            <div className='navbar-nav-botones'>
              <NavLink to={"/login"}>
                <button className='btn btn-dark botonesNavbar'>Ingresar</button>
              </NavLink>
              <NavLink to={"/registrarse"}>
                <button className='btn btn-dark botonesNavbar'>Registrarse</button>
              </NavLink>
            </div>
            :
            null
          }
        </Navbar.Collapse>
      {
        token ?
        <div className='navbar-nav-iconosCyF me-auto'>
          {
            usuario.estado === "Pendiente" ?
            <>
              <OverlayTrigger overlay={renderTooltip} placement='bottom' delay={{show: 250, hide: 400}}>
                <NavLink title='Carrito' aria-disabled className={"text-decoration-none text-dark"}>
                  <i className="bi bi-cart iconosCyF"></i> 
                  <Badge bg="success" className='badges'>{carritoUsuario.length}</Badge>
                </NavLink>
              </OverlayTrigger>
              <OverlayTrigger overlay={renderTooltip} placement='bottom' delay={{show: 250, hide: 400}}>
                <NavLink to={"/favoritos"} reloadDocument title='Favoritos' className={"text-decoration-none text-dark"}>
                  <i className="bi bi-heart-fill iconosCyF" id='favoritoNav'></i>
                  <Badge bg="success" className='badges'>{favoritosUsuario.length}</Badge>
                </NavLink>
              </OverlayTrigger>
            </>
            :
            usuario.estado == "Activo" ?
            <>
              <OverlayTrigger overlay={renderTooltip} placement='bottom' delay={{show: 250, hide: 400}}>
                <NavLink to={"/carrito"} reloadDocument title='Carrito' aria-disabled className={"text-decoration-none text-dark"}>
                  <i className="bi bi-cart iconosCyF"></i> 
                  <Badge bg="success" className='badges'>{carritoUsuario.length}</Badge>
                </NavLink>
              </OverlayTrigger>
              <OverlayTrigger overlay={renderTooltip} placement='bottom' delay={{show: 250, hide: 400}}>
                <NavLink to={"/favoritos"} reloadDocument title='Favoritos' className={"text-decoration-none text-dark"}>
                  <i className="bi bi-heart-fill iconosCyF" id='favoritoNav'></i>
                  <Badge bg="success" className='badges'>{favoritosUsuario.length}</Badge>
                </NavLink>
              </OverlayTrigger>
            </>
              :
              null
          }
        </div>
        :
        null
      }
      </Container>
      <Navbar.Collapse className={token && usuario.rol === "admin" ? "navegacionAdminLogueado" : token && usuario.rol === "usuario" ? "navegacionUsuarioComun" : "navegacionSinIS"}>
        <NavLink to={"/contacto"} reloadDocument className={"text-decoration-none text-dark"}>Contacto</NavLink>
        <NavLink to={"/"} reloadDocument className={"text-decoration-none text-dark"}>Inicio</NavLink>
        {
          token ? 
          <>
            <NavLink to={"/"} onClick={() => sessionStorage.clear()} reloadDocument className={"text-decoration-none text-dark"}>Cerrar Sesión</NavLink>
            {
              usuario.rol === "admin" ?
              <NavDropdown title="Administración" id="collapsible-nav-dropdown" className='admin text-dark'>
                <NavDropdown.Item reloadDocument onClick={() => window.location.href = "/administracion/usuarios"}>
                  Usuarios
                </NavDropdown.Item>
                <NavDropdown.Item reloadDocument onClick={() => window.location.href = "/administracion/productos"}>
                  Productos
                </NavDropdown.Item>
                <NavDropdown.Item reloadDocument onClick={() => window.location.href = "/administracion/categorias"}>
                  Categorias
                </NavDropdown.Item>
              </NavDropdown>
              :
              null
            }
          </>
          :
          null
        }
      </Navbar.Collapse>
      {
        idUsuario ? 
        <div className='ms-auto mx-3 usuarioNavbar'>
          <span className='fs-5'>Usuario: {usuario.username}</span>
        </div>
        :
        null
      }
    </Navbar>
  )
}