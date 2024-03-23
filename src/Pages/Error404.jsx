import { Link } from 'react-router-dom'
import error404 from '../assets/404.png'

export const Error404 = () => {
  return (
    <div className='bg-error404 text-center'>
      <img src={error404} alt="error404" className='imagenError404'/>
      <div className='divError404'>
        <h5 className='d-block mb-4'>Upss. La página que estabas buscando no existe</h5>
        <Link to="/" className='btn btn-dark' replace reloadDocument>Volver a Página Principal</Link>
      </div>
    </div>
  )
}
