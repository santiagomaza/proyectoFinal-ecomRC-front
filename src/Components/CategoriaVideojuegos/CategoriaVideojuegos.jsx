import imgvideojuego from '../../assets/videojuego.webp'
import { Link } from 'react-router-dom'

export const CategoriaVideojuegos = () => {
  return (
    <div className="col-md-5">
      <p className='text-center titulosCategorias fs-3 fst-italic fw-bold'>VIDEOJUEGOS</p>
      <Link to="/Videojuegos">
        <div className="cardCategorias">
          <img src={imgvideojuego} alt="bebidas" className='imagenesCat'/>
        </div>
      </Link>
    </div>
  )
}
