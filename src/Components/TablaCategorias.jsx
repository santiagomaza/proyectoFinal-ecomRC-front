import { useState, useEffect } from 'react'
import axios from 'axios'
import { BotonPublicarCategoria } from './BotonPublicarCategoria';
import { BotonQuitarCatPublicada } from './BotonQuitarCatPublicada';
import { BotonEditarCategoria } from './BotonEditarCategoria';
import { BotonEliminarCategoria } from './BotonEliminarCategoria';

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
          categorias.sort((a,b) => b.publicada - a.publicada)
          .map((categoria) => (
            <tr key={categoria._id}>
              <th scope="row">{categoria._id}</th>
              <td>{categoria.categoria}</td>
              <td style={{width: "300px"}}>{categoria.descripcion}</td>
              {
                categoria.publicada === true?
                <td>
                  <BotonQuitarCatPublicada idCategoria = {categoria._id} nombre = {categoria.categoria}/>
                </td>
                :
                <td>
                  <BotonPublicarCategoria idCategoria = {categoria._id} nombre = {categoria.categoria}/>
                </td>
              }
              <td>
                <BotonEditarCategoria idCategoria = {categoria._id} nombre = {categoria.categoria} descripcion = {categoria.descripcion}/>
                <BotonEliminarCategoria idCategoria = {categoria._id} nombre = {categoria.categoria}/>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};
