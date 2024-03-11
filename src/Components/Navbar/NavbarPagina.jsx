import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'
import { BarraBuscadoraNavbar } from '../BarraBuscadora/BarraBuscadoraNavbar';
import { NavLink, Link} from 'react-router-dom'
import logoecomrc from '../../assets/ecom.jpg'

export const NavbarPagina = () => {
  const token = localStorage.getItem('token')
  

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
            <div className=''>
              <span className='mx-2'>Hola</span>
              <span className='mx-2'>dsdf</span>
            </div>
          }
          <div className='d-flex'>
            <NavLink to="/*" className="pruebita text-decoration-none text-dark fs-2">Contacto</NavLink>
            {
              token ?
              <>
                <NavLink className="pruebita2 text-decoration-none text-dark fs-2">Administración</NavLink>
                <NavLink className="pruebita3 text-decoration-none text-dark fs-2">Holis</NavLink>
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
