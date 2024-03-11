import './resultadosBusqueda.css'
import { Link } from 'react-router-dom'

export const ResultadosBusqueda = ({ nombre }) => {
  return (
    <Link to={`/detalleProducto/${4}`} className='text-decoration-none text-dark'>
      <p className='resultadoNombreProducto'>{nombre}</p>
    </Link>
  )
}
