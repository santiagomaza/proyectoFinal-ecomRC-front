import { useState, useEffect } from 'react'
import axios from 'axios'

export const TablaCategorias = () => {
  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    const obtenerCategorias = async () => {
      const respuesta = await axios.get('http://localhost:8000/categorias/obtener-categorias')
      setCategorias(respuesta.data)
      console.log(respuesta.data)
    }

    obtenerCategorias()
  }, [])

  return (
    <table className="table table-bordered align-middle text-center mt-4">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Nombre de la Categoría</th>
          <th scope="col">Descripción</th>
          <th scope="col">Publicada</th>
          <th scope="col">Opciones</th>
        </tr>
      </thead>
      <tbody>
        {
          categorias &&
          categorias.map((categoria) => (
            <tr key={categoria._id}>
              <th scope="row">{categoria._id}</th>
              <td>{categoria.categoria}</td>
              <td style={{width: "300px"}}>{categoria.descripcion}</td>
              {
                categoria.publicada === true?
                <td>
                  <i className="bi bi-check-circle-fill fs-2 text-success"></i>
                </td>
                :
                <td>
                  <i className="bi bi-x-circle-fill fs-2 text-danger"></i>
                </td>
              }
              <td style={{width: "100px"}}>
                <button className="btn btn-outline-danger">Borrar</button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};
