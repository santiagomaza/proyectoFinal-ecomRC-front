import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FormCrearCategoría } from './FormCrearCategoría';

export const ModalAgregarCategoria = ({show, handleClose}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton style={{backgroundColor: "#f4ae2b"}}>
        <Modal.Title>Agregar Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormCrearCategoría />
        <Button variant="dark" onClick={handleClose}>Cerrar</Button>
      </Modal.Body>
    </Modal>
  );
};
