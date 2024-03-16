import { useParams } from 'react-router-dom'
import { FormRestablecerContraseña } from '../../Components/FormRestablecerContraseña/FormRestablecerContraseña'

export const RecuperarContraseña = () => {
  const { token } = useParams()
  
  return (
    <body className='d-flex justify-content-center align-items-center body'>
      <FormRestablecerContraseña token = {token}/>
    </body>
  )
}
