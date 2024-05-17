import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FormEditarProducto } from "./FormEditarProducto";

export const ModalEditarProducto = ({ show, handleClose }) => {
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton style={{backgroundColor: "#0d6efd"}}>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormEditarProducto/>
        <Button variant="dark" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Body>
    </Modal>
  );
};
