import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function animationLogo() {
  gsap
    .timeline({
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#logo-mask",
        start: "top top",
        endTrigger: "header",
        end: "top top",
        scrub: 1,
      },
    })
    .to("#animation-contener", { scale: 1 })
    .to("#info-animation", { opacity: 0, duration: 1.5 }, "<")
    .to("#logo-animation", { opacity: 0, duration: 0.3 }, "<")
    .to(
      "#logo-mask",
      {
        maskSize: "clamp(100vh, 20%, 20vh)",
      },
      0.3
    )
    .to(
      "#animation-contener",
      {
        opacity: 0,
      },
      0.4
    )
    .to(
      "#logo-mask",
      {
        opacity: 0,
      },
      1
    )
    .to(
      "#logo-mask",
      {
        y: -650,
      },
      0.9
    );
}

export function initAnimationLogo() {
  document.addEventListener("DOMContentLoaded", animationLogo);
  document.addEventListener("astro:after-swap", animationLogo);
}
