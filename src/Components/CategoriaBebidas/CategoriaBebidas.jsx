import imgbebidas from '../../assets/bebidas.jpg'
import { Link } from 'react-router-dom'

export const CategoriaBebidas = () => {
  return (
    <div className="col-md-5">
      <p className="text-center titulosCategorias fs-3 fst-italic fw-bold">BEBIDAS</p>
      <Link to="/*">
        <div className="cardCategorias">
          <img src={imgbebidas} alt="bebidas" style={{ height: "420px", width: "520px" }}/>
        </div>
      </Link>
    </div>
  );
};
