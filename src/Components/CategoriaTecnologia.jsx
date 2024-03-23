import imgtecnologia from '../assets/tecnologia.webp'
import { Link } from 'react-router-dom'

export const CategoriaTecnologia = () => {
  return (
    <div className="col-md-5">
      <p className='text-center titulosCategorias fs-3 fst-italic fw-bold'>TECNOLOGIA</p>
      <Link to="/Tecnología">
        <div className="cardCategorias">
          <img src={imgtecnologia} alt="tecnologia" className='imagenesCat'/>
        </div>
      </Link>
    </div>
  )
}
