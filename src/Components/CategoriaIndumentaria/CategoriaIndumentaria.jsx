import imgindumentario from '../../assets/indumentaria.webp'
import { Link } from 'react-router-dom'

export const CategoriaIndumentaria = () => {
  return (
    <div className="col-md-5">
      <p className='text-center titulosCategorias fs-3 fst-italic fw-bold'>INDUMENTARIA</p>
      <Link to="/indumentaria">
        <div className="cardCategorias">
          <img src={imgindumentario} alt="bebidas" style={{height: "420px", width: "520px"}}/>
        </div>
      </Link>
    </div>
  )
}
