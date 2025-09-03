import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function animationLogo() {
  const tl = gsap.timeline({
    ease: "power2.out",
    scrollTrigger: {
      scrub: 1,
    },
  });

  tl.to("#animation-contener", { duration: 1, scale: 1 })
    .to("#info-animation", { opacity: 0, duration: 0.18 }, "<")
    .to("#logo-animation", { opacity: 0, duration: 0.03 }, "<")
    .to(
      "#logo-mask",
      {
        maskSize: "clamp(100vh, 20%, 20vh)",
        duration: 0.1,
      },
      0.01
    )
    .to(
      "#animation-contener",
      {
        opacity: 0,
        duration: 0.16,
      },
      0.01
    )
    .to(
      "#logo-mask",
      {
        opacity: 0,
        duration: 0.195,
      },
      0.1
    )
    .to(
      "#logo-mask",
      {
        y: -400,
        duration: 0.4,
      },
      0.095
    );
}

export function initAnimationLogo() {
  document.addEventListener("DOMContentLoaded", animationLogo);
  document.addEventListener("astro:after-swap", animationLogo);
}
