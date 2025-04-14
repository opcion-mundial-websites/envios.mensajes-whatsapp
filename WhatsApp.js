const input = document.getElementById("telefono");
const btn = document.getElementById("btnWhatsapp");
const modal = document.getElementById("modalConfirm");
const modalNumero = document.getElementById("modalNumero");
const confirmarBtn = document.getElementById("confirmarBtn");
const errorMsg = document.getElementById("errorMsg");
const loader = document.getElementById("loader");

let numeroValido = "";

document.addEventListener("DOMContentLoaded", () => {
  const guardado = localStorage.getItem("numeroGuardado");
  if (guardado) {
    input.value = guardado;
    validarNumero();
  }
});

function toggleMode() {
  document.body.classList.toggle("dark");
}

input.addEventListener("input", validarNumero);

function validarNumero() {
  let numero = input.value.replace(/[^\d]/g, "");

  if (numero.startsWith("57")) numero = numero.slice(2);
  if (numero.startsWith("+57")) numero = numero.slice(3);

  input.value = numero;

  if (numero.length === 10 && numero.startsWith("3")) {
    input.classList.remove("error");
    btn.classList.add("visible");
    numeroValido = numero;
    errorMsg.style.display = "none";
    localStorage.setItem("numeroGuardado", numero);
  } else {
    input.classList.add("error");
    btn.classList.remove("visible");
    errorMsg.style.display = "block";
  }
}

btn.addEventListener("click", () => {
  modal.classList.remove("hide");
  modal.style.display = "flex";
  modalNumero.textContent = "+57 " + numeroValido;
});

confirmarBtn.addEventListener("click", () => {
  loader.style.display = "block";
  confirmarBtn.style.display = "none";

  setTimeout(() => {
    const mensaje = encodeURIComponent(`Hola, ¡Bienvenido a la Fundación Opción Mundial! Nos complace informarte que has sido seleccionado para recibir una de nuestras becas estudiantiles. Te invitamos a acercarte a la Fundación Educativa Elyon Yireh para iniciar tu proceso de matrícula.

Te recordamos que para el proceso de matrícula debes cancelar 50 mil pesos y llevar los siguientes documentos: Copia del documento de identidad, Copia del último diploma de estudio y copia del Sisbén o recibo público.

¡Esperamos verte pronto!`);

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const url = `https://${isMobile ? "api" : "web"}.whatsapp.com/send?phone=57${numeroValido}&text=${mensaje}`;
    window.open(url, '_blank');
    cerrarModal(true);
  }, 3000);
});

function cerrarModal(force) {
  modal.classList.add("hide");
  setTimeout(() => {
    modal.style.display = "none";
    modal.classList.remove("hide");
    loader.style.display = "none";
    confirmarBtn.style.display = "inline-block";
  }, 500);
}

// Al presionar Enter en el input con ID "telefono", se activa el botón btnWhatsapp
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (btn.classList.contains("visible")) {
      btn.click();
    }
  }
});
