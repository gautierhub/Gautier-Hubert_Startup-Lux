// navbar script - gsap animated numbers

$(function () {
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 10) {
      $(".navbar").addClass("active");
    } else {
      $(".navbar").removeClass("active");
    }
  });
});

// reveal script - gsap animated reveal & counter animation

function animateFrom(elem, direction) {
  direction = direction || 1;
  var x = 0,
    y = direction * 100;
  if (elem.classList.contains("gs_reveal_fromLeft")) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains("gs_reveal_fromRight")) {
    x = 100;
    y = 0;
  } else if (elem.classList.contains("gs_reveal_counter")) {
    y = 0;
    gsap.from(elem, {
      x: 0,
      y: 0,
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
  }
  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(
    elem,
    { x: x, y: y, autoAlpha: 0 },
    {
      duration: 2,
      x: 0,
      y: 0,
      autoAlpha: 1,
      ease: "power3",
      overwrite: "auto",
    }
  );
}

function hide(elem) {
  gsap.set(elem, { autoAlpha: 0 });
}

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".gs_reveal").forEach(function (elem) {
    hide(elem);

    ScrollTrigger.create({
      trigger: elem,
      start: "top 75%",
      onEnter: function () {
        animateFrom(elem);
      },
      onLeaveBack: (self) => self.disable(),
    });
  });
});

// journey script - carousel

let navLinks = document.querySelectorAll(".carousel .nav-link");
let slides = document.querySelectorAll(".carousel .slide");
let maxZIndex = navLinks.length;
let easeInOutQuart = "cubic-bezier(0.77, 0, 0.175, 1)";
slides[0].classList.add("active");
navLinks[0].classList.add("active");
navLinks.forEach((navLink, activeIndex) => {
  navLink.addEventListener("mouseenter", () => {
    navLinks.forEach((navLink) => navLink.classList.remove("active"));
    navLink.classList.add("active");
    let currentSlide = document.querySelector(".carousel .slide.active");
    let slideFadeOut = currentSlide.animate(
      [
        { transform: "translateY(5%)", opacity: 1 },
        { transform: "translateY(0)", opacity: 0 },
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
            transform: "translateY(-5%)",
            opacity: 0,
          },
          {
            transform: "translateY(0)",
            opacity: 1,
          },
        ],
        { duration: 600, easing: "ease-out", fill: "forwards" }
      );
    };
  });
});
