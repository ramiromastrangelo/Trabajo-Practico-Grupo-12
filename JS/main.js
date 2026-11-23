document.addEventListener("DOMContentLoaded", () => {
  //
  const botonModoOscuro = document.getElementById("btn-modo");
  if (botonModoOscuro) {
    botonModoOscuro.addEventListener("click", () => {
      document.body.classList.toggle("modo-oscuro");
      if (document.body.classList.contains("modo-oscuro")) {
        botonModoOscuro.textContent = "Modo Claro";
      } else {
        botonModoOscuro.textContent = "Modo Oscuro";
      }
    });
  }
            //JS EN CONTACTOS//
  // VALIDACIÓN Y ENVÍO DEL FORMULARIO
  const formulario = document.querySelector(".formulario-contacto");
  if (formulario) {
    const mensajeEstado = document.createElement("p");
    mensajeEstado.style.marginTop = "10px";
    mensajeEstado.style.fontWeight = "bold";
    mensajeEstado.style.fontSize = "0.95rem";
    formulario.appendChild(mensajeEstado);

    formulario.addEventListener("submit", (evento) => {
      evento.preventDefault();

      const inputNombre = formulario.querySelector("input[type='text']");
      const inputEmail = formulario.querySelector("input[type='email']");
      const textareaMensaje = formulario.querySelector("textarea");

      const nombre = inputNombre ? inputNombre.value.trim() : "";
      const email = inputEmail ? inputEmail.value.trim() : "";
      const mensaje = textareaMensaje ? textareaMensaje.value.trim() : "";

      [inputNombre, inputEmail, textareaMensaje].forEach((campo) => {
        if (campo) campo.style.borderColor = "#4a5d4e";
      });

      if (nombre === "" || email === "" || mensaje === "") {
        mensajeEstado.textContent = "Por favor, completá todos los campos obligatorios.";
        mensajeEstado.style.color = "#ff6b6b";
        if (nombre === "" && inputNombre) inputNombre.style.borderColor = "#ff6b6b";
        if (email === "" && inputEmail) inputEmail.style.borderColor = "#ff6b6b";
        if (mensaje === "" && textareaMensaje) textareaMensaje.style.borderColor = "#ff6b6b";
        return;
      }

      if (!email.includes("@") || !email.includes(".")) {
        mensajeEstado.textContent = "Ingresá un correo electrónico válido.";
        mensajeEstado.style.color = "#ff6b6b";
        if (inputEmail) inputEmail.style.borderColor = "#ff6b6b";
        return;
      }

      mensajeEstado.textContent = `¡Gracias ${nombre}! Tu mensaje fue enviado a la central de Los Santos.`;
      mensajeEstado.style.color = "#8ab894";
      formulario.reset();

      setTimeout(() => {
        mensajeEstado.textContent = "";
      }, 5000);
    });
  }

  //  COPIAR TELÉFONO O EMAIL CON UN CLIC 
  const datosCopiables = document.querySelectorAll(".dato-copiable");
  datosCopiables.forEach((elemento) => {
    elemento.style.cursor = "pointer";
    elemento.style.textDecoration = "underline";
    elemento.style.textDecorationStyle = "dotted";

    elemento.addEventListener("click", () => {
      navigator.clipboard.writeText(elemento.textContent).then(() => {
        if (elemento.parentElement.querySelector(".aviso-copiado")) return;
        const aviso = document.createElement("span");
        aviso.className = "aviso-copiado";
        aviso.textContent = " ¡Copiado!";
        aviso.style.color = "#8ab894";
        aviso.style.fontWeight = "bold";
        aviso.style.fontSize = "0.85rem";
        aviso.style.marginLeft = "8px";
        elemento.parentElement.appendChild(aviso);
        setTimeout(() => aviso.remove(), 2000);
      });
    });
  });

  //  INDICADOR DE ESTADO DE ATENCIÓN 
  const estadoAtencion = document.getElementById("estado-atencion");
  if (estadoAtencion) {
    const ahora = new Date();
    const dia = ahora.getDay();
    const hora = ahora.getHours();
    const esDiaHabil = dia >= 1 && dia <= 5;
    const esHorarioComercial = hora >= 9 && hora < 18;

    estadoAtencion.style.marginTop = "8px";
    estadoAtencion.style.fontWeight = "bold";
    estadoAtencion.style.fontSize = "0.9rem";

    if (esDiaHabil && esHorarioComercial) {
      estadoAtencion.innerHTML = "🟢 Oficinas abiertas ahora (9:00 a 18:00 hs)";
      estadoAtencion.style.color = "#8ab894";
    } else {
      estadoAtencion.innerHTML = "🔴 Cerrado ahora (Dejanos tu consulta en el formulario)";
      estadoAtencion.style.color = "#ff6b6b";
    }
  }
});