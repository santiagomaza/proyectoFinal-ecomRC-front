import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FormEditarProducto } from "../FormEditarProducto/FormEditarProducto";

export const ModalEditarProducto = ({show, handleClose, idProducto, nombre, precio, stock, categoriaProd, descripcion, imagen1, imagen2, imagen3 }) => {
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton style={{backgroundColor: "#0d6efd"}}>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormEditarProducto 
          idProducto = {idProducto}
          nombre = {nombre}
          precio = {precio}
          stock = {stock}
          categoriaProd = {categoriaProd}
          descripcion = {descripcion}
          imagen1 = {imagen1}
          imagen2 = {imagen2}
          imagen3 = {imagen3}
        />
        <Button variant="dark" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Body>
    </Modal>
  );
};
