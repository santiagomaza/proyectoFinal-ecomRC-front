import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FormEditarUsuario } from './FormEditarUsuario';

export const ModalEditarUsuario = ({ show, handleClose }) => {
  return (
    <Modal size='lg' show={show} onHide={handleClose}>
      <Modal.Header closeButton style={{backgroundColor: "#0d6efd"}}>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormEditarUsuario/>
        <Button variant="dark" onClick={handleClose}>Cerrar</Button>
      </Modal.Body>
    </Modal>
  );
};
