import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FormEditarUsuario } from '../FormEditarUsuario/FormEditarUsuario';

export const ModalEditarUsuario = ({ show, handleClose, idUsuario, nombre, username, email, pais, estado, rol, provincia, codigoPostal, domicilio, telefono }) => {
  return (
    <Modal size='lg' show={show} onHide={handleClose}>
      <Modal.Header closeButton style={{backgroundColor: "#0d6efd"}}>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormEditarUsuario 
          idUsuario = {idUsuario}
          nombre = {nombre}
          username = {username}
          email = {email}
          pais = {pais}
          estado = {estado}
          rol = {rol}
          provincia = {provincia}
          codigoPostal = {codigoPostal}
          domicilio = {domicilio}
          telefono = {telefono}
        />
        <Button variant="dark" onClick={handleClose}>Cerrar</Button>
      </Modal.Body>
    </Modal>
  );
};
