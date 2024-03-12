import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'
import { BarraBuscadoraNavbar } from '../BarraBuscadora/BarraBuscadoraNavbar';
import { NavLink, Link, useNavigate } from 'react-router-dom'
import logoecomrc from '../../assets/ecom.jpg'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Badge from 'react-bootstrap/Badge';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const NavbarPagina = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const cerrarSesion = () => {
    navigate("/", {replace: true})
    
    setTimeout(() => {
      navigate(0)
      localStorage.removeItem("token")
    }, 1000);
  }

  const renderTooltip = (props) => (
    <Tooltip id="tooltip" {...props}/>
  )
  
  return (
    <Navbar expand="lg" className="navbar">
      <img src={logoecomrc} alt="" className='logoEmpresa mx-4 rounded-circle' style={{height: "90px", width: "90px"}}/>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className='d-flex redesSoc'>
          <Link to="/www.google.com" className="text-decoration-none text-dark"><i className="bi bi-instagram mx-2 fs-3"></i></Link>
          <i className="bi bi-twitter mx-2 fs-3"></i>
          <i className="bi bi-linkedin mx-2 fs-3"></i>
          <i className="bi bi-github mx-2 fs-3"></i>
        </div>
        <BarraBuscadoraNavbar/>
        <Nav className="d-flex flex-wrap ms-auto">
          {
            !token ?
            <div className='mx-1 botonesInicReg'>
              <NavLink to="/login" className='btn btn-dark mx-4'>Iniciar Sesión</NavLink>
              <NavLink to="/registrarse" className='btn btn-dark'>Registrarse</NavLink>
            </div>
            :
            <div className='iconosCyF'>
              <OverlayTrigger overlay={renderTooltip} placement='bottom' delay={{show: 250, hide: 400}}>
                <NavLink className="text-dark" to="/carrito" title='Carrito'>
                  <i className="bi bi-cart fs-2 px-4"></i>
                  <Badge bg="success" className='badgeCarrito'>{4}</Badge>
                </NavLink>
              </OverlayTrigger>
              <OverlayTrigger overlay={renderTooltip} placement='bottom' delay={{show: 250, hide: 400}}>
                <NavLink className="text-dark" to="/favoritos" title='Favoritos'>
                  <i className="bi bi-heart-fill fs-2"></i>
                  <Badge bg="success" className='badgeFavoritos'>{2}</Badge>
                </NavLink>
              </OverlayTrigger>
            </div>
          }
        </Nav>
          <div className='header'>
            <NavLink to="/*" className="contacto text-decoration-none text-dark fs-2">Contacto</NavLink>
            <NavLink className="inicio text-decoration-none text-dark fs-2">Inicio</NavLink>
            {
              token ?
              <>
                <NavLink className="cerrarSesion text-decoration-none text-dark fs-2" onClick={cerrarSesion}>Cerrar Sesión</NavLink>
                <NavDropdown title="Administración" id="collapsible-nav-dropdown" className='admin text-dark'>
                  <NavDropdown.Item>
                    <NavLink to="/administracion/usuarios" className="text-decoration-none text-dark">Usuarios</NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <NavLink to="/administracion/productos" className="text-decoration-none text-dark">Productos</NavLink>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
              :
              null
            }
          </div>
      </Navbar.Collapse>     
    </Navbar>
  )
}
