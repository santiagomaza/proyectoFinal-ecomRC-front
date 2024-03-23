import { BotonEditarComentario } from './BotonEditarComentario'
import { BotonEliminarComentario } from './BotonEliminarComentario'
import '../styles/cardComentario.css'

export const CardComentario = ({ id, usuario, msj, fecha }) => {
  return (
    <div className="card mt-4 mx-4">
      <div className="card-body cbComentario">
        <span className="fw-bold">{usuario}</span>
        <span className="fs-6 d-block">{fecha}</span>
        <p className="mt-2">{msj}</p>
        <div className="d-flex justify-content-end botonesCardComentario">
          <BotonEditarComentario id = {id} mensaje = {msj}/>
          <BotonEliminarComentario id = {id}/>
        </div>
      </div>
    </div>
  )
}
