import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FormEditarComentario } from "./FormEditarComentario";

export const ModalEditarComentario = ({ id, mensaje, show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton style={{backgroundColor: "#0d6efd"}}>
        <Modal.Title>Editar Comentario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormEditarComentario id = {id} mensaje = {mensaje}/>
        <Button variant="dark" onClick={handleClose}>Cerrar</Button>
      </Modal.Body>
    </Modal>
  );
};
