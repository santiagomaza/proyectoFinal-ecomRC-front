import imgbebidas from '../../assets/bebidas.jpg'
import { Link } from 'react-router-dom'

export const CategoriaBebidas = () => {
  return (
    <div className="col-md-5 col-sm-12">
      <p className="text-center titulosCategorias fs-3 fst-italic fw-bold">BEBIDAS</p>
      <Link to="/bebidas">
        <div className="cardCategorias">
          <img src={imgbebidas} alt="bebidas" className='imagenesCat'/>
        </div>
      </Link>
    </div>
  );
};
