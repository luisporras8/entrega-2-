
let numeroSecreto = generarNumeroSecreto();
let intentos = 0;
const maxIntentos = 5;

document.getElementById("verificarBtn").addEventListener("click", () => {
  const valor = parseInt(document.getElementById("intentoUsuario").value);
  if (isNaN(valor)) return;

  intentos++;
  const mensaje = document.getElementById("mensaje");
  const restantes = document.getElementById("intentosRestantes");

  if (valor === numeroSecreto) {
    mensaje.textContent = "¡Felicidades! Adivinaste el número 🎉";
    guardarResultado(true);
    deshabilitarJuego();
  } else if (valor < numeroSecreto) {
    mensaje.textContent = "El número es más alto 📈";
  } else {
    mensaje.textContent = "El número es más bajo 📉";
  }

  restantes.textContent = `Intentos restantes: ${maxIntentos - intentos}`;

  if (intentos >= maxIntentos && valor !== numeroSecreto) {
    mensaje.textContent = `Te quedaste sin intentos. El número era ${numeroSecreto}`;
    guardarResultado(false);
    deshabilitarJuego();
  }
});

function generarNumeroSecreto() {
  return Math.floor(Math.random() * 100) + 1;
}

function deshabilitarJuego() {
  document.getElementById("intentoUsuario").disabled = true;
  document.getElementById("verificarBtn").disabled = true;
}

function guardarResultado(ganado) {
  const historial = JSON.parse(localStorage.getItem("historialJuegos")) || [];
  historial.push({
    resultado: ganado ? "Ganado" : "Perdido",
    numero: numeroSecreto,
    fecha: new Date().toLocaleString()
  });
  localStorage.setItem("historialJuegos", JSON.stringify(historial));
}
