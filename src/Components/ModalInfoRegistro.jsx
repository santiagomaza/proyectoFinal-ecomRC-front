import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

const ModalInfoRegistro = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="transparent" className='botonDesplegarInfo' onClick={handleShow}>
        <i className="bi bi-info-circle-fill fs-3"></i>
      </Button>    
    
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{backgroundColor: "#f4ae2b"}}>
          <Modal.Title className=''>Información Importante</Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex flex-wrap'>
          <Alert variant="info" className='mt-3 fuenteAlert'>
            <strong>NOTA:</strong> Al registrarte, tu cuenta se creará con un estado <strong>Pendiente</strong>. Se te enviará un correo de verificación a la casilla de email que proporcionaste para poder activar tu cuenta. Por eso, asegúrate de escribir el email correcto. Caso contrario, deberás esperar a que un administrador cambie tu estado
          </Alert>
          <p>La contraseña debe tener al menos <strong>1 mayuscula, 1 minúscula, 1 número y un simbolo (#.:-_*)</strong>. Además debe tener cómo minimo 8 caracteres y como máximo 15</p>  
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalInfoRegistro