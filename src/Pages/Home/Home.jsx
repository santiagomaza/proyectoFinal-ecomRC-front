import { CarruselProductosDestacados } from "../../Components/CarruselProductosDestacados/CarruselProductosDestacados"
import { NavbarPagina } from "../../Components/Navbar/NavbarPagina"

export const Home = () => {
  return (
    <>
      <NavbarPagina />
      <div className="mt-4">
        <h3 className="text-center">Destacado de la semana</h3>
        <CarruselProductosDestacados />
      </div>
    </>
  )
}
