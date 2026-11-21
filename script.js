// ELEMENTOS DEL DOCUMENTO 
const formulario = document.getElementById("formContacto");
const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const mensaje = document.getElementById("mensaje");
const respuesta = document.getElementById("respuestaContacto");

const botonVolver = document.getElementById("btnVolverArriba");
const fechaActualizacion = document.getElementById("fechaActualizacion");

const buscador = document.getElementById("buscar");
const resultadoBusqueda = document.getElementById("resultadoBusqueda");

//  MOSTRAR LA FECHA 
const fecha = new Date();

fechaActualizacion.textContent = fecha.toLocaleDateString("es-AR", {
  day: "numeric",
  month: "long",
  year: "numeric"
});

// VALIDAR Y PROCESAR EL FORMULARIO 
formulario.addEventListener("submit", function(evento) {
  evento.preventDefault();

  if (nombre.value.trim() === "" ||
      correo.value.trim() === "" ||
      mensaje.value.trim() === "") {
    respuesta.textContent = "Por favor, completá todos los campos.";
    return;
  }

  if (!correo.checkValidity()) {
    correo.reportValidity();
    return;
  }

  respuesta.textContent = `¡Gracias, ${nombre.value.trim()}! Tu mensaje fue recibido correctamente en esta demostración.`;

  formulario.reset();
});

//  DESTACAR LOS CAMPOS DEL FORMULARIO 
const campos = [nombre, correo, mensaje];

campos.forEach(function(campo) {
  campo.addEventListener("focus", function() {
    campo.classList.add("campo-activo");
  });

  campo.addEventListener("blur", function() {
    campo.classList.remove("campo-activo");
  });
});

// BOTÓN PARA VOLVER AL INICIO 
window.addEventListener("scroll", function() {
  if (window.scrollY > 300) {
    botonVolver.style.display = "block";
  } else {
    botonVolver.style.display = "none";
  }
});

botonVolver.addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

//  BUSCADOR DE CONTENIDOS 
function buscarSecciones() {
  const palabra = buscador.value.toLowerCase().trim();
  const secciones = document.querySelectorAll("main section");
  let coincidencias = 0;

  secciones.forEach(function(seccion) {
    const contenido = seccion.textContent.toLowerCase();

    if (seccion.id === "introduccion" ||
        palabra === "" ||
        contenido.includes(palabra)) {

      seccion.style.display = "";

      if (palabra !== "" &&
          seccion.id !== "introduccion" &&
          contenido.includes(palabra)) {
        coincidencias++;
      }

    } else {
      seccion.style.display = "none";
    }
  });

  if (palabra === "") {
    resultadoBusqueda.textContent = "Escribí una palabra para buscarla en el sitio.";
  } else if (coincidencias > 0) {
    resultadoBusqueda.textContent =
      `Encontramos ${coincidencias} sección(es) relacionadas. Borrá la búsqueda para volver a ver todo el sitio.`;
  } else {
    resultadoBusqueda.textContent = "No encontramos coincidencias. Probá con otra palabra.";
  }
}

buscador.addEventListener("input", function() {
  const palabra = buscador.value.trim();

  // Guarda la última búsqueda en el almacenamiento local.
  if (palabra === "") {
    localStorage.removeItem("ultimaBusqueda");
  } else {
    localStorage.setItem("ultimaBusqueda", palabra);
  }

  buscarSecciones();
});

//  RECUPERAR LA ÚLTIMA BÚSQUEDA 
const ultimaBusqueda = localStorage.getItem("ultimaBusqueda");

if (ultimaBusqueda) {
  buscador.value = ultimaBusqueda;
  buscarSecciones();
}

