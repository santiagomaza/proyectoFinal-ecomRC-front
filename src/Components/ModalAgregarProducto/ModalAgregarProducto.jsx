import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FormAgregarProducto } from '../FormAgregarProducto/FormAgregarProducto';

export const ModalAgregarProducto = ({show, handleClose}) => {
  return (
    <Modal size='lg' show={show} onHide={handleClose}>
      <Modal.Header closeButton style={{backgroundColor: "#f4ae2b"}}>
        <Modal.Title>Agregar Productos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormAgregarProducto />
        <Button variant="dark" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Body>
    </Modal>
  )
}
