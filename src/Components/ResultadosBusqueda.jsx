import { Link } from 'react-router-dom'
import '../styles/resultadosBusqueda.css'

export const ResultadosBusqueda = ({ id, nombre }) => {
  return (
    <Link to={`/producto/${id}`} reloadDocument className='text-decoration-none text-dark'>
      <p className='resultadoNombreProducto'>{nombre}</p>
    </Link>
  )
}
