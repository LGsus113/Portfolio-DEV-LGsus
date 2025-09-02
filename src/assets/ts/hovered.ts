import { $, $$ } from "@/assets/ts/dom-selector";

function hoveredGlobal() {
  const menus = document.querySelectorAll(".hover-menu");

  menus.forEach((menu: any) => {
    if (!menu) {
      console.log("No se encontró el menú");
    } else {
      const itemsSelector = menu.getAttribute("data-items");
      const containerSelector = menu.getAttribute("data-container");

      if (!itemsSelector || !containerSelector) {
        console.log("No se encontraron los selectores");
      } else {
        const listItem = document.querySelectorAll(itemsSelector);
        const header = document.querySelector(containerSelector);

        if (!header || listItem.length === 0) {
          console.log("No se encontraron los elementos");
        } else {
          listItem.forEach((item) => {
            item.addEventListener("mouseenter", () => {
              const rect = item.getBoundingClientRect();
              const headerRect = header.getBoundingClientRect();

              const left = rect.left - headerRect.left;
              const top = rect.top - headerRect.top;

              console.log("Menu encontrado:", left);
              console.log("Menu encontrado:", top);
              console.log("Menu encontrado:", rect.width);
              console.log("Menu encontrado:", rect.height);

              menu.style.setProperty("--left", `${left}px`);
              menu.style.setProperty("--top", `${top}px`);
              menu.style.setProperty("--width", `${rect.width}px`);
              menu.style.setProperty("--height", `${rect.height}px`);

              menu.style.opacity = "1";
              menu.style.visibility = "visible";
            });

            item.addEventListener("mouseleave", () => {
              menu.style.opacity = "0";
              menu.style.visibility = "hidden";
            });
          });
        }
      }
    }
  });
}

export function initHovered() {
  document.addEventListener("DOMContentLoaded", hoveredGlobal);
  document.addEventListener("astro:after-swap", hoveredGlobal);
}
