const items = document.querySelectorAll(".counter");

gsap.from(items, {
  textContent: 0,
  duration: 2,
  ease: "power3",
  snap: { textContent: 1 },
  stagger: {
    each: 1.0,
    onUpdate: function () {
      this.targets()[0].innerHTML = this.targets()[0].textContent + "+";
    },
  },
});

$(function () {
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 10) {
      $(".navbar").addClass("active");
    } else {
      $(".navbar").removeClass("active");
    }
  });
});

let navLinks = document.querySelectorAll(".carousel .nav-link");
let slides = document.querySelectorAll(".carousel .slides");
let desc = document.querySelectorAll(".text-desc");
let maxZIndex = navLinks.length;
let easeInOutQuart = "cubic-bezier(0.77, 0, 0.175, 1)";
slides[0].classList.add("active");
navLinks[0].classList.add("active");
navLinks.forEach((navLink, activeIndex) => {
  navLink.addEventListener("mouseover", () => {
    // nav-link
    navLinks.forEach((navLink) => navLink.classList.remove("active"));
    navLinks.forEach((navLink) => navLink.classList.remove("underline"));
    navLink.classList.add("active");
    navLink.classList.add("underline");
    // slide
    let currentSlide = document.querySelector(".carousel .slides.active");
    let slideFadeOut = currentSlide.animate(
      [
        { transform: "translateY(0)", opacity: 1 },
        { transform: "translateY(5%)", opacity: 0 },
      ],
      {
        duration: 600,
        easing: "ease-in",
        fill: "forwards",
      }
    );
    slideFadeOut.onfinish = () => {
      slides.forEach((slide) => slide.classList.remove("active"));
      let activeSlide = slides[activeIndex];
      activeSlide.classList.add("active");
      activeSlide.animate(
        [
          {
            transform: "translateY(0%)",
            opacity: 0,
          },
          {
            transform: "translateY(-10%)",
            opacity: 1,
          },
        ],
        { duration: 600, easing: "ease-out", fill: "forwards" }
      );
    };
  });
});
