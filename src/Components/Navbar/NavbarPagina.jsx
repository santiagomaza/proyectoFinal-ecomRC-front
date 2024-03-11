import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'
import { BarraBuscadoraNavbar } from '../BarraBuscadora/BarraBuscadoraNavbar';
import { NavLink, Link, useNavigate } from 'react-router-dom'
import logoecomrc from '../../assets/ecom.jpg'

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
            null
          }
          <div className='d-flex'>
            <NavLink to="/*" className="contacto text-decoration-none text-dark fs-2">Contacto</NavLink>
            {
              token ?
              <>
                <NavLink className="cerrarSesion text-decoration-none text-dark fs-2" onClick={cerrarSesion}>Cerrar Sesión</NavLink>
                <NavLink className="admin text-decoration-none text-dark fs-2">Administración</NavLink>
              </>
              :
              null
            }
          </div>
        </Nav>
      </Navbar.Collapse>     
    </Navbar>
  )
}
