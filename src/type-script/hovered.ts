import { $, $$ } from "@/type-script/dom-selector";

function handleMouseEnter(
  menu: HTMLElement,
  container: HTMLElement,
  item: HTMLElement
) {
  const rect = item.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const left = rect.left - containerRect.left;
  const top = rect.top - containerRect.top;

  menu.style.setProperty("--left", `${left}px`);
  menu.style.setProperty("--top", `${top}px`);
  menu.style.setProperty("--width", `${rect.width}px`);
  menu.style.setProperty("--height", `${rect.height}px`);

  menu.style.opacity = "1";
  menu.style.visibility = "visible";
}

function handleMouseLeave(menu: HTMLElement) {
  menu.style.opacity = "0";
  menu.style.visibility = "hidden";
}

function hovered() {
  const containers = $$("[data-container-linkers]");
  if (!containers) return;

  containers.forEach((container) => {
    const menu = $<HTMLElement>("[data-hover-menu]", container);
    const listItems = $$<HTMLElement>("[data-list-linkers]", container);

    if (!menu || listItems.length === 0) return;

    listItems.forEach((item) => {
      item.addEventListener("mouseenter", () =>
        handleMouseEnter(menu, container, item)
      );
      item.addEventListener("mouseleave", () => handleMouseLeave(menu));
    });
  });
}

export function useHovered() {
  document.addEventListener("DOMContentLoaded", hovered);
  document.addEventListener("astro:after-swap", hovered);
}
