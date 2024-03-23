import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../styles/modalAgregarUsuario.css'
import { FormCrearUsuario } from '../FormCrearUsuario/FormCrearUsuario';

export const ModalAgregarUsuario = ({show, handleClose}) => {
  return (
    <Modal size='lg' show={show} onHide={handleClose}>
      <Modal.Header closeButton className='headerModalBg'>
        <Modal.Title>Agregar Usuarios</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormCrearUsuario />
        <Button variant="dark" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Body>
    </Modal>
  )
}
