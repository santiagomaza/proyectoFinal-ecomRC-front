import imgvehiculos from '../../assets/vehiculos.jpg'
import { Link } from 'react-router-dom'

export const CategoriaVehiculos = () => {
  return (
    <div className="col-md-5">
      <p className='text-center titulosCategorias fs-3 fst-italic fw-bold'>VEHICULOS</p>
      <Link to="/vehiculos">
        <div className="cardCategorias">
          <img src={imgvehiculos} alt="bebidas" className='imagenesCat'/>
        </div>
      </Link>
    </div>
  )
}
