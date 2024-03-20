import './resultadosBusqueda.css'
import { Link } from 'react-router-dom'

export const ResultadosBusqueda = ({ id, nombre }) => {
  return (
    <Link to={`/producto/${id}`} reloadDocument className='text-decoration-none text-dark'>
      <p className='resultadoNombreProducto'>{nombre}</p>
    </Link>
  )
}
