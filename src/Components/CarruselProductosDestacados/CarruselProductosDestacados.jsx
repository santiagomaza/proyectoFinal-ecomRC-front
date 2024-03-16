import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from 'axios'
import './carruselProductosDestacados.css'

export const CarruselProductosDestacados = () => {
  const [index, setIndex] = useState(0);
  const [productoDestacado, setProductoDestacado] = useState([])

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const obtenerProductosDestacados = async () => {
      const respuesta = await axios.get('http://localhost:8000/productos/obtener-productos')
      setProductoDestacado(respuesta.data.filter((producto) => producto.destacado === true).shift())
    }

    obtenerProductosDestacados()
  }, [productoDestacado])

  return (
    <div className="d-flex justify-content-center">
      <Carousel activeIndex={index} className="mx-4 w-75 border border-dark carrusel" onSelect={handleSelect}>
        <Carousel.Item>
          <div className="d-flex justify-content-center">
            <img src={productoDestacado.imagen1} alt="Imagen Destacado" className="w-100" style={{height: "500px"}}/>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-flex justify-content-center">
            <img src={productoDestacado.imagen2} alt="Imagen Destacado" className="w-100" style={{height: "500px"}}/>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-flex justify-content-center">
            <img src={productoDestacado.imagen3} alt="Imagen Destacado" className="w-100" style={{height: "500px"}}/>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};
