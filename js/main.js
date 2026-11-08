/* ---------- Тёмная тема ---------- */
const THEME_KEY = "shop:theme";
const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    const isDark = theme === "dark";
    btn.setAttribute("aria-pressed", isDark ? "true" : "false");
    const icon = btn.querySelector(".theme-toggle__icon");
    if (icon) icon.textContent = isDark ? "☀" : "☾";
  });
};

const initThemeToggle = () => {
  const saved = localStorage.getItem(THEME_KEY);
  // Принудительно темная, если нет сохраненного выбора
  applyTheme(saved === "light" || saved === "dark" ? saved : "dark");

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = document.documentElement.dataset.theme || "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  });
};
initThemeToggle();

/* ---------- Модальное окно ---------- */
const orderDialog = document.getElementById("order-dialog");
const orderButtons = document.querySelectorAll("[data-product]");
const closeDialogButton = document.getElementById("close-order-dialog");
const selectedProductInput = document.getElementById("selected-product");

if (orderButtons.length > 0 && orderDialog) {
  orderButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (selectedProductInput) selectedProductInput.value = button.dataset.product || "";
      orderDialog.showModal();
    });
  });
}

if (closeDialogButton && orderDialog) {
  closeDialogButton.addEventListener("click", () => orderDialog.close());
}

/* ---------- Валидация формы ---------- */
const orderForm = document.getElementById("order-form");
const successMessage = document.getElementById("success-message");

if (orderForm) {
  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formElements = Array.from(orderForm.elements);
    
    if (!orderForm.checkValidity()) {
      formElements.forEach((el) => {
        if (el.willValidate && !el.checkValidity()) el.setAttribute("aria-invalid", "true");
      });
      orderForm.reportValidity();
      return;
    }
    
    if (successMessage) successMessage.hidden = false;
    orderForm.reset();
    if (orderDialog) orderDialog.close();
  });
}