import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from 'axios'
import '../styles/carruselProductosDestacados.css'

export const CarruselProductosDestacados = () => {
  const [index, setIndex] = useState(0);
  const [productoDestacado, setProductoDestacado] = useState([])
  const [hayProdDestacado, setHayProdDestacado] = useState(false)

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const obtenerProductosDestacados = async () => {
      const respuesta = await axios.get("https://proyectofinal-ecomrc-back.onrender.com/productos/obtener-productos")
      setProductoDestacado(respuesta.data.producto.filter((producto) => producto.destacado === true).shift())
      
      if(respuesta.status === 200){
        setHayProdDestacado(true)
      }
      else{
        setHayProdDestacado(false)
      }
    }

    obtenerProductosDestacados()
  }, [productoDestacado])

  return (
    <div className="d-flex justify-content-center">
      {
        hayProdDestacado ?
        <>
          <Carousel activeIndex={index} className={"mx-4 w-50 border border-dark carrusel"} onSelect={handleSelect}>
            <Carousel.Item>
              <div className="d-flex justify-content-center">
                {
                  hayProdDestacado ?
                  <img src={productoDestacado.imagen1} alt="Imagen Destacado" className="w-100 imgCarrusel"/>
                  :
                  null
                }
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="d-flex justify-content-center">
                {
                  hayProdDestacado ?
                  <img src={productoDestacado.imagen2} alt="Imagen Destacado" className="w-100 imgCarrusel"/>
                  :
                  <></>
                }
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="d-flex justify-content-center">
                {
                  hayProdDestacado ?
                  <img src={productoDestacado.imagen3} alt="Imagen Destacado" className="w-100 imgCarrusel"/>
                  :
                  <></>
                }
              </div>
            </Carousel.Item>
          </Carousel>
        </>
        :
        <h4 className="text-center">Recuperando datos...</h4>
      }
    </div>
  );
};
