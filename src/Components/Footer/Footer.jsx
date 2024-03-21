import './footer.css'
import logoecomrc from  '../../assets/ecom.jpg'
import { NavLink, Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer_pagina'>
        <div className='footer_enlaces'>
          <img src={logoecomrc} alt="" style={{height: "150px", width:"150px"}} className='logoEmpresaFooter rounded rounded-circle'/>
          <div className="footer_enlaces_div">
            <h4>SOBRE NOSOTROS</h4>
            <NavLink to={"/*"}><p>Quienes somos</p></NavLink>
            <NavLink to={"/*"}><p>Envios</p></NavLink>
            <NavLink to={"/*"}><p>Politicas y Privacidad</p></NavLink>
            <NavLink to={"/contacto"}><p>Contacto</p></NavLink>
            <NavLink to={"/*"}><p>Ayuda</p></NavLink>
            <NavLink to={"/*"}><p>Reembolso</p></NavLink>
            <NavLink to={"/*"}><p>Defensa del Consumidor</p></NavLink>
          </div>
          <div className='footer_enlaces_div'>
            <h4>REDES SOCIALES</h4>
            <Link to='https://www.instagram.com/santiago.maza99/'>
              <i className="fs-2 bi bi-instagram"></i>
            </Link>
            <Link to={"https://twitter.com/santimmaza"}>
              <i className="fs-2 bi bi-twitter"></i>
            </Link>
            <Link to={"https://www.linkedin.com/in/santiago-maza-5b4561258"}>
              <i className="fs-2 bi bi-linkedin"></i>
            </Link>
            <Link to={"https://github.com/santiagomaza"}>
              <i className="fs-2 bi bi-github"></i>
            </Link>
          </div>
          <div className='footer_enlaces_div'>
            <h4>CONTACTO</h4>
            <div className='d-flex mb-2 mx-3'>
              <i className="bi bi-envelope-fill fs-4 pe-2"></i>
              <p className='mt-1'>ecomrc.tuc@gmail.com</p>
            </div>
            <div className='d-flex mb-2 mx-3'>
              <i className="bi bi-telephone-fill fs-4 pe-2"></i>
              <p className='mt-1'>+593 987 654 321</p>
            </div>
            <div className='d-flex mx-3'>
              <i className="bi bi-geo-alt-fill fs-4 pe-2"></i>
              <p className='ubicacion'>San Miguel de Tucumán, Tucumán, Argentina</p>
            </div>
          </div>
        </div>
        <div className='footer_parrafo'>
          <div className='footer_copyright'>
            <p>Copyright © 2024 eComRC. Todos los derechos reservados. Santiago Maza, Rolling Code</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
