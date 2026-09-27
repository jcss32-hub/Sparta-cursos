const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");
const loginModal = document.getElementById("loginModal");
const toast = document.getElementById("toast");
const contactForm = document.getElementById("contactForm");
const loginForm = document.getElementById("loginForm");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("active");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

function abrirLogin() {
  loginModal.classList.add("active");
  loginModal.setAttribute("aria-hidden", "false");
}

function fecharLogin() {
  loginModal.classList.remove("active");
  loginModal.setAttribute("aria-hidden", "true");
}

loginModal.addEventListener("click", event => {
  if (event.target === loginModal) fecharLogin();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") fecharLogin();
});

loginForm.addEventListener("submit", event => {
  event.preventDefault();
  mostrarToast("Login demonstrativo: o backend ainda não está conectado.");
  fecharLogin();
  loginForm.reset();
});

contactForm.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  mostrarToast(`Obrigado, ${name || "visitante"}! Este formulário é demonstrativo.`);
  contactForm.reset();
});

function mostrarToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 3500);
}

function inscreverCurso(nomeCurso) {
  const numero = "5582999999999"; // SUBSTITUA pelo WhatsApp oficial
  const mensagem = `Olá! Tenho interesse em "${nomeCurso}". Gostaria de receber mais informações sobre a turma, horários e formas de pagamento.`;
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function filtrarCursos(category) {
  const cards = document.querySelectorAll(".course-card");
  let visible = 0;

  cards.forEach(card => {
    const match = category === "todos" || card.dataset.category === category;
    card.style.display = match ? "" : "none";
    if (match) visible++;
  });

  document.getElementById("emptyState").style.display = visible ? "none" : "block";
  document.getElementById("cursos").scrollIntoView({ behavior: "smooth" });
}
