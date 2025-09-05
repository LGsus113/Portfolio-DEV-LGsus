import { $, $$ } from "@/type-script/dom-selector";

function activeCarousel() {
  const skills = Array.from($$("#skill-carousel > *"));
  const prevBtn = $<HTMLButtonElement>("#prevBtn");
  const nextBtn = $<HTMLButtonElement>("#nextBtn");

  if (!skills.length || !prevBtn || !nextBtn) return;

  let index = 0;
  const perPage = 3;

  function updateCarousel() {
    skills.forEach((el, i) => {
      el.style.display = i >= index && i < index + perPage ? "flex" : "none";
    });

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index + perPage >= skills.length;
  }

  function setActiveSkill(selected: HTMLElement) {
    skills.forEach((el) => {
      el.classList.remove("scale-105", "shadow-black");
      el.classList.add("shadow-white");
    });
    selected.classList.remove("shadow-white");
    selected.classList.add("scale-105", "shadow-black");

    const tech = selected.dataset.skill;
    if (tech) {
      const event = new CustomEvent("skillSelected", { detail: { tech } });
      document.dispatchEvent(event);
    }
  }

  setActiveSkill(skills[1]);

  skills.forEach((el) => {
    el.addEventListener("click", () => setActiveSkill(el));
  });

  prevBtn.addEventListener("click", () => {
    if (index - perPage >= 0) {
      index -= perPage;
      updateCarousel();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (index + perPage < skills.length) {
      index += perPage;
      updateCarousel();
    }
  });

  updateCarousel();
}

export function initCarousel() {
  document.addEventListener("DOMContentLoaded", activeCarousel);
  document.addEventListener("astro:page-load", activeCarousel);
}
