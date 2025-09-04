import { $ } from "@/type-script/dom-selector";

function updateMenuState(button: HTMLElement, menu: HTMLElement) {
  const isLgTailwind = window.innerWidth >= 1024;

  if (isLgTailwind) {
    button.setAttribute("aria-expanded", "false");
    menu.classList.add("hidden");
  }
}

function menuHover() {
  const button = $("#menu-button");
  const menu = $("#navbar-hamburger");

  if (!button || !menu) return;

  button.addEventListener("click", () => {
    const isLgTailwind = window.innerWidth >= 1024;
    if (isLgTailwind) return;

    const isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", isExpanded ? "false" : "true");
    menu.classList.toggle("hidden");
  });

  window.addEventListener("resize", () => updateMenuState(button, menu));
  updateMenuState(button, menu);
}

export function menuInit() {
  document.addEventListener("DOMContentLoaded", menuHover);
  document.addEventListener("astro:page-load", menuHover);
}
