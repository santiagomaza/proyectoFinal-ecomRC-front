import '../styles/cardsProductos.css'
import { Link } from 'react-router-dom'

export const CardsProductos = ({ id, nombre, imagen, precio }) => {
  return (
    <div className="d-flex justify-content-center col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="card" style={{width: "18rem"}}>
        <img src={imagen} className="card-img-top" alt="Imagen producto" style={{height: "280px"}}/>
        <div className="card-body" style={{backgroundColor: "#f4ae2b"}}>
          <h6 className="card-title">{nombre}</h6>
          {
            precio === 0 ?
            <p className="card-text fw-bold">Gratis</p>
            :
            <p className="card-text fw-bold">${precio}</p>
          }
          <Link to={`/producto/${id}`}>
            <button href="#" className="btn btn-dark btn-sm fw-bold">VER DETALLES</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
