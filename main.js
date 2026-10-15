const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const toggle = document.querySelector(".nav-toggle");
const mobile = document.getElementById("mobile-nav");

function closeMobile() {
  if (!mobile || !toggle) return;
  mobile.hidden = true;
  toggle.setAttribute("aria-expanded", "false");
}

toggle?.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  mobile.hidden = open;
});

mobile?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobile);
});

const dialog = document.getElementById("access-dialog");
const form = document.getElementById("access-form");
const thanks = document.getElementById("access-thanks");
const error = document.getElementById("form-error");
const emailInput = document.getElementById("email");
const agentInput = document.getElementById("agent");

function resetDialog() {
  form.hidden = false;
  thanks.hidden = true;
  error.hidden = true;
  error.textContent = "";
}

function openAccess() {
  closeMobile();
  resetDialog();
  dialog.showModal();
  emailInput.focus();
}

document.querySelectorAll("[data-open-access]").forEach((button) => {
  button.addEventListener("click", openAccess);
});

document.querySelectorAll("[data-close-access]").forEach((button) => {
  button.addEventListener("click", () => dialog.close());
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

dialog.addEventListener("close", resetDialog);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = emailInput.value.trim();
  const agent = agentInput.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!valid) {
    error.hidden = false;
    error.textContent = email ? "That email doesn’t look right." : "Add a work email.";
    emailInput.focus();
    return;
  }

  const subject = "Brutepace early access";
  const body = [`Email: ${email}`, agent ? `Agent: ${agent}` : ""]
    .filter(Boolean)
    .join("\n");
  const href = `mailto:hello@rootspace.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  document.getElementById("thanks-email").textContent = email;
  const mailLink = document.getElementById("mailto-link");
  mailLink.href = href;
  form.hidden = true;
  thanks.hidden = false;
});

const uptime = document.getElementById("uptime");
const started = Date.now();
const baseMinutes = 14 * 24 * 60 + 6 * 60;

function renderUptime() {
  const extra = Math.floor((Date.now() - started) / 60000);
  const total = baseMinutes + extra;
  const days = Math.floor(total / (24 * 60));
  const hours = Math.floor((total % (24 * 60)) / 60);
  uptime.textContent = `${days}d ${String(hours).padStart(2, "0")}h`;
}

renderUptime();
setInterval(renderUptime, 30000);

if (location.hash === "#request") openAccess();
