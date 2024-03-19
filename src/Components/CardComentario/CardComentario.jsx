import './cardComentario.css'

export const CardComentario = ({ usuario, msj, fecha }) => {
  return (
    <div className="card mt-4 mx-4">
      <div className="card-body">
        <span className="fw-bold">{usuario}</span>
        <span className="fs-6 d-block">{fecha}</span>
        <p className="mt-2">{msj}</p>
        <div className="d-flex justify-content-end botonesCardComentario">
          <button className="btn btn-primary me-2">Editar</button>
          <button className="btn btn-danger">Eliminar</button>
        </div>
      </div>
    </div>
  )
}
