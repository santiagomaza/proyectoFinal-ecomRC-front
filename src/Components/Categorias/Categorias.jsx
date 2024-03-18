import './categorias.css'
import { CategoriaBebidas } from '../CategoriaBebidas/CategoriaBebidas'
import { CategoriaIndumentaria } from '../CategoriaIndumentaria/CategoriaIndumentaria'
import { CategoriaVideojuegos } from '../CategoriaVideojuegos/CategoriaVideojuegos'
import { CategoriaVehiculos } from '../CategoriaVehiculos/CategoriaVehiculos'

export const Categorias = () => {
  return (
    <>
    <div className='contenedorCategorias'>
      <h2 className="mt-3 text-center">Categorias</h2>
      <article className='mx-4'>
        <div className='row d-flex justify-content-evenly mb-1'>
          <CategoriaBebidas/> 
          <CategoriaIndumentaria />
        </div>
        <div className='row d-flex justify-content-evenly'>
          <CategoriaVideojuegos />
          <CategoriaVehiculos />
        </div>
      </article>
    </div>
    </>
  )
}
