import { FormContacto } from "../../Components/FormContacto/FormContacto"
import { NavbarPagina } from "../../Components/Navbar/NavbarPagina"
import { Footer } from "../../Components/Footer/Footer";

export const Contacto = () => {
  return (
    <>
      <NavbarPagina />
      <article className="pagContacto">
        <h2 className="text-center">Página de Contacto</h2>
        <p className="mx-3">Si tienes alguna pregunta, comentario o sugerencia, no dudes en ponerte en contacto con nosotros. Puedes utilizar el formulario de contacto a continuacion o enviarnos un correo electrónico a <strong>ecomrc.tuc@gmail.com</strong>.</p>
        <p className="mx-3">Estamos comprometidos a brindarte el mejor servicio posible, así que responderemos a tu mensaje lo antes posible.</p>
      </article>
      <article className="d-flex justify-content-center mb-4">
        <FormContacto />
      </article>
      <Footer />
    </>
  )
}
