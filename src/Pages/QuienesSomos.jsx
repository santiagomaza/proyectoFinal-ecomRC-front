import { NavbarPagina } from '../Components/NavbarPagina'
import { Footer } from '../Components/Footer'
import yo from '../assets/yo.jpeg'

export const QuienesSomos = () => {
  return (
    <>
      <NavbarPagina />
      <div className='pagQuienesSomos'>
        <h2 className='text-center'>Quienes Somos</h2>
        <div className="row">
          <div className='d-flex justify-content-center col-md-12 col-sm-12 mb-4'>
            <div className="card" style={{width: "18rem", backgroundColor: "#f4ae2b"}}>
              <img src={yo} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Santiago Maza</h5>
                <p className="card-text">Estudiante de la carrera Tecnicatura Universitaria en Programación en la Universidad Tecnológica Nacional, Facultad Regional Tucumán. Tengo 24 años y soy programador Full Stack MERN.</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
