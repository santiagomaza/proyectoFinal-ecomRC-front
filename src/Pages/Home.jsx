import { NavbarPagina } from "../Components/NavbarPagina"
import { CarruselProductosDestacados } from "../Components/CarruselProductosDestacados"
import { Categorias } from "../Components/Categorias"
import { Footer } from "../Components/Footer"

export const Home = () => {
  return (
    <>
      <NavbarPagina />
      <div className="home">
        <h3 className="text-center">Destacado de la semana</h3>
        <CarruselProductosDestacados />
      </div>
      <div className="mb-4">
        <Categorias />
      </div>
      <Footer />  
    </>
  )
}
