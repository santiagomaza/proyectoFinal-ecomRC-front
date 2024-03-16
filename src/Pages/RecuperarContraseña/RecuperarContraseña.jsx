import { useParams } from 'react-router-dom'

export const RecuperarContraseña = () => {
  const { token } = useParams()
  console.log(token)
  
  return (
    <div>RecuperarContraseña</div>
  )
}
