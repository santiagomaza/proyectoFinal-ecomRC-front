import { CategoriaBebidas } from './CategoriaBebidas'
import { CategoriaIndumentaria } from './CategoriaIndumentaria'
import { CategoriaVideojuegos } from './CategoriaVideojuegos'
import { CategoriaTecnologia } from './CategoriaTecnologia'
import '../styles/categorias.css'

export const Categorias = () => {
  return (
    <>
    <div className='contenedorCategorias'>
      <h2 className="mt-3 text-center">Categorias</h2>
      <article className='mx-4'>
        <div className='row d-flex justify-content-center mb-1'>
          <CategoriaBebidas/> 
          <CategoriaIndumentaria />
        </div>
        <div className='row d-flex justify-content-center'>
          <CategoriaVideojuegos />
          <CategoriaTecnologia />
        </div>
      </article>
    </div>
    </>
  )
}
