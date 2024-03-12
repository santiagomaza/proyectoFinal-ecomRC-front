import { Link } from 'react-router-dom'

export const Error404 = () => {
  return (
    <div className='text-center'>
      <h2>Error 404</h2>
      <span className='d-block'>Upss. Parece que ha habido un error</span>
      <Link to="/" className='fs-4' replace>Volver al inicio</Link>
    </div>
  )
}
