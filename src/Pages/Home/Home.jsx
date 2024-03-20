import { CarruselProductosDestacados } from "../../Components/CarruselProductosDestacados/CarruselProductosDestacados"
import { Categorias } from "../../Components/Categorias/Categorias"
import { NavbarPagina } from "../../Components/Navbar/NavbarPagina"

export const Home = () => {
  return (
    <>
      <NavbarPagina />
      <div className="home">
        <h3 className="text-center">Destacado de la semana</h3>
        <CarruselProductosDestacados />
      </div>
      <Categorias />
    </>
  )
}
