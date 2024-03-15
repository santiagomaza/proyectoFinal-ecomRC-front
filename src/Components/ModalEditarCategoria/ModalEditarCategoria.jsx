import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FormEditarCategoria } from "../FormEditarCategoria/FormEditarCategoria";

export const ModalEditarCategoria = ({ show, handleClose, idCategoria, nombre, descripcion }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton style={{backgroundColor: "#0d6efd"}}>
        <Modal.Title>Editar Categoria</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormEditarCategoria idCategoria = {idCategoria} nombre = {nombre} descripcion = {descripcion}/>
        <Button variant="dark" onClick={handleClose}>Cerrar</Button>
      </Modal.Body>
    </Modal>
  );
};
