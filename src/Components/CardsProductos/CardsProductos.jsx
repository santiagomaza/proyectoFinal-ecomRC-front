import './cardsProductos.css'

export const CardsProductos = ({ nombre, imagen, precio }) => {
  return (
    <div className="d-flex justify-content-center col-md-3 mb-3">
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
          <button href="#" className="btn btn-dark btn-sm fw-bold">VER DETALLES</button>
        </div>
      </div>
    </div>
  )
}
