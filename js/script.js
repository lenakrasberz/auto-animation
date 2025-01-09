// document.addEventListener("DOMContentLoaded", () => {
//   const starRating = document.querySelector(".star-rating");
//   const stars = document.querySelectorAll(".star-rating__item");

//   stars.forEach((star) => {
//     star.addEventListener("click", () => {
//       const value = star.getAttribute("data-item-value"); // Получаем значение звезды
//       starRating.setAttribute("data-total-value", value); // Устанавливаем значение в data-total-value
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const starRating = document.querySelector(".star-rating");
  const stars = document.querySelectorAll(".star-rating__item");

  stars.forEach((star) => {
    // Наведение: подсвечиваем звезды слева направо
    star.addEventListener("mouseenter", () => {
      const value = star.getAttribute("data-item-value");
      highlightStars(value);
    });

    // Уход мыши: сбрасываем подсветку до выбранного значения
    star.addEventListener("mouseleave", () => {
      const totalValue = starRating.getAttribute("data-total-value");
      highlightStars(totalValue);
    });

    // Клик: фиксируем выбранное значение
    star.addEventListener("click", () => {
      const value = star.getAttribute("data-item-value");
      starRating.setAttribute("data-total-value", value);
      highlightStars(value);
    });
  });

  // Функция для подсветки звезд в зависимости от значения
  function highlightStars(value) {
    stars.forEach((star) => {
      const starValue = star.getAttribute("data-item-value");
      const path = star.querySelector("svg path");
      if (starValue <= value) {
        path.setAttribute("fill", "#e8aa31"); // Подсвечиваем звезду
      } else {
        path.setAttribute("fill", "#8c8989"); // Оставляем серой
      }
    });
  }
});

//Slider
const swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 48,
  pagination: {
    enabled: false,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    slideChange: function () {
      updatePagination(this.activeIndex);
    },
  },
});
//пагинация для слайдера

const pagination = document.querySelectorAll(".swiper-pagination__custom span");
pagination.forEach((span, index) => {
  span.addEventListener("click", () => {
    swiper.slideTo(index);
    updatePagination(index);
  });
});
function updatePagination(activeIndex) {
  pagination.forEach((span) => {
    span.classList.remove("active");
  });
  pagination[activeIndex].classList.add("active");
}

//аккордеон (код когда открываются все вкладки)

// const list = document.querySelector(".questions__list");

// list.addEventListener("click", (e) => {
//   if (e.target.classList.contains("questions__btn")) {
//     const btn = e.target;
//     const content = btn.previousElementSibling;
//     btn.classList.toggle("active");

//     if (content.style.display === "block") {
//       content.style.display = "none";
//     } else {
//       content.style.display = "block";
//     }
//   }
// });
//аккордеон (код когда открывается одна вкладка)

const list = document.querySelector(".questions__list");

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("questions__btn")) {
    const btnActive = e.target;
    const content = btnActive.previousElementSibling;

    const allButtons = document.querySelectorAll(".questions__btn");

    allButtons.forEach((button) => {
      const allContent = button.previousElementSibling;
      if (button !== btnActive) {
        button.classList.remove("active");
        allContent.classList.remove("active");
      }
    });

    btnActive.classList.toggle("active");
    content.classList.toggle("active");
  }
});

//Burger

const burger = document.querySelector(".burger");
const wrapper = document.querySelector(".header__wrapper");
const body = document.body;
// обычный бургер, который открывается сбоку

// burger.addEventListener("click", function () {
//   burger.classList.toggle("active");
//   if (wrapper.style.display === "none" || wrapper.style.display === "") {
//     wrapper.style.display = "flex";
//   } else {
//     wrapper.style.display = "none";
//   }
// });

burger.addEventListener("click", function () {
  burger.classList.toggle("active");
  wrapper.classList.toggle("open");

  if (wrapper.classList.contains("open")) {
    body.classList.add("no-scroll");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else {
    body.classList.remove("no-scroll");
  }
});

//Animation

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline();

tl.fromTo(
  ".header__logo-img",
  {
    y: 100,
  },
  {
    y: 0,
  }
)
  .fromTo(
    ".header__item",
    {
      y: -100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0.15,
    }
  )
  .fromTo(
    ".header__contacts",
    {
      y: -300,
      ease: "sine.out",
    },
    {
      y: 0,
    }
  )
  .fromTo(
    ".hero__title",
    {
      opacity: 0,
      x: -1000,
    },
    {
      x: 0,
      opacity: 1,
    }
  )
  .fromTo(
    ".hero__btn",
    {
      opacity: 0,
      y: 50,
    },
    {
      y: 0,
      opacity: 1,
    }
  )
  .fromTo(
    ".hero__btn-inner",
    {
      opacity: 0,
      y: 50,
    },
    {
      y: 0,
      opacity: 1,
    }
  )
  .fromTo(
    ".hero__text-wrapper",
    {
      opacity: 0,
      x: -1000,
    },
    {
      x: 0,
      opacity: 1,
    }
  );

gsap
  .timeline({
    scrollTrigger: {
      // scrub: true,
      trigger: ".offer", // Селектор второго экрана
      start: "top center", // Начало анимации: верх экрана — центр viewport
      end: "bottom center", // Конец анимации (опционально)
      toggleActions: "play reverse play reverse", // Автоматически запускает анимацию при скролле
    },
  })

  .fromTo(
    ".offer__subtitle",
    {
      opacity: 0,
      x: -1000,
    },
    {
      x: 0,
      opacity: 1,
    }
  )
  .fromTo(
    ".offer__title",
    {
      opacity: 0,
      x: 1000,
    },
    {
      x: 0,
      opacity: 1,
    }
  )
  .fromTo(
    ".offer__link-wrapper",
    {
      opacity: 0,
      x: 1000,
    },
    {
      x: 0,
      opacity: 1,
    }
  );

gsap
  .timeline({
    scrollTrigger: {
      // scrub: true,
      trigger: ".steps", // Селектор второго экрана
      start: "top center", // Начало анимации: верх экрана — центр viewport
      end: "bottom center", // Конец анимации (опционально)
      toggleActions: "play reverse play reverse", // Автоматически запускает анимацию при скролле
    },
  })
  .fromTo(
    ".steps__content",
    {
      y: 100,
    },
    {
      y: 0,
    }
  )
  .fromTo(
    ".steps__list",
    {
      y: -100,
    },
    {
      y: 0,
    }
  )
  .fromTo(
    ".steps__button",
    {
      scale: 0,
    },
    {
      scale: 1,
    }
  );
gsap
  .timeline({
    scrollTrigger: {
      // scrub: true,
      trigger: ".about",
      start: "top center", // Начало анимации: верх экрана — центр viewport
      end: "bottom center", // Конец анимации (опционально)
      toggleActions: "play reverse play reverse", // Автоматически запускает анимацию при скролле
    },
  })
  .fromTo(
    ".about__title",
    {
      x: -1000,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
    }
  )
  .fromTo(
    ".about__button",
    {
      x: 1000,
      scale: 0,
    },
    {
      x: 0,
      scale: 1,
    }
  )
  .fromTo(
    ".about_item",
    {
      y: -100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0.15,
    }
  );
gsap
  .timeline({
    scrollTrigger: {
      // scrub: true,
      trigger: ".brands", // Селектор второго экрана
      start: "top center", // Начало анимации: верх экрана — центр viewport
      end: "bottom center", // Конец анимации (опционально)
      toggleActions: "play reverse play reverse", // Автоматически запускает анимацию при скролле
    },
  })
  .fromTo(
    ".brands__title",
    {
      y: -100,
      scale: 0,
    },
    {
      y: 0,
      scale: 1,
      rotation: 360,
    }
  )
  .fromTo(
    ".brands__item",
    {
      scale: 0.5,
      scrub: true,
    },
    {
      scale: 1,
      stagger: 0.15,
    }
  );

gsap
  .timeline({
    scrollTrigger: {
      // scrub: true,
      trigger: ".blog", // Селектор второго экрана
      start: "top center", // Начало анимации: верх экрана — центр viewport
      end: "bottom center", // Конец анимации (опционально)
      toggleActions: "play reverse play reverse", // Автоматически запускает анимацию при скролле
    },
  })
  .fromTo(
    ".blog__title",
    {
      x: -1000,
      scale: 0,
    },
    {
      x: 0,
      scale: 1,
    }
  )
  .fromTo(
    ".blog__link-wrap",
    {
      xPercent: 100,
      scale: 0,
    },
    {
      xPercent: 0,
      scale: 1,
    }
  )
  .fromTo(
    ".blog__item",
    {
      scale: 0.9,
    },
    {
      scale: 1,
      stagger: 0.15,
    }
  );
gsap
  .timeline({
    scrollTrigger: {
      // scrub: true,
      trigger: ".slider", // Селектор второго экрана
      start: "top center", // Начало анимации: верх экрана — центр viewport
      end: "bottom center", // Конец анимации (опционально)
      toggleActions: "play reverse play reverse", // Автоматически запускает анимацию при скролле
    },
  })
  .fromTo(
    ".slider__title",
    {
      y: -100,
      scale: 0,
    },
    {
      y: 0,
      scale: 1,
    }
  )
  .fromTo(
    ".swiper-wrapper .swiper-slide",
    {
      scale: 0.9,
    },
    {
      stagger: 0.15,
      scale: 1,
    }
  );
gsap
  .timeline({
    scrollTrigger: {
      // scrub: true,
      trigger: ".questions", // Селектор второго экрана
      start: "top center", // Начало анимации: верх экрана — центр viewport
      end: "bottom center", // Конец анимации (опционально)
      toggleActions: "play reverse play reverse", // Автоматически запускает анимацию при скролле
    },
  })
  .fromTo(
    ".questions__title",
    {
      y: -100,
      scale: 0,
    },
    {
      y: 0,
      scale: 1,
    }
  )
  .fromTo(
    ".questions__item",
    {
      scale: 0.9,
    },
    {
      stagger: 0.15,
      scale: 1,
    }
  );
gsap
  .timeline({
    scrollTrigger: {
      // scrub: true,
      trigger: ".contacts", // Селектор второго экрана
      start: "top center", // Начало анимации: верх экрана — центр viewport
      end: "bottom center", // Конец анимации (опционально)
      toggleActions: "play reverse play reverse", // Автоматически запускает анимацию при скролле
    },
  })
  .fromTo(
    ".contacts__title",
    {
      x: 1000,
      scale: 0,
    },
    {
      x: 0,
      scale: 1,
    }
  )
  .fromTo(
    ".contacts__btn",
    {
      x: -1000,
      scale: 0,
    },
    {
      x: 0,
      scale: 1,
    }
  );
gsap
  .timeline({
    scrollTrigger: {
      // scrub: true,
      trigger: ".map", // Селектор второго экрана
      start: "top center", // Начало анимации: верх экрана — центр viewport
      end: "bottom center", // Конец анимации (опционально)
      toggleActions: "play reverse play reverse", // Автоматически запускает анимацию при скролле
    },
  })
  .fromTo(
    ".map__inner",
    {
      scale: 0.8,
    },
    {
      scale: 1,
    }
  );
gsap
  .timeline({
    scrollTrigger: {
      // scrub: true,
      trigger: ".footer", // Селектор второго экрана
      start: "top center", // Начало анимации: верх экрана — центр viewport
      end: "bottom center", // Конец анимации (опционально)
      toggleActions: "play reverse play reverse", // Автоматически запускает анимацию при скролле
    },
  })
  .fromTo(
    ".footer__top-title",
    {
      opacity: 0,
      x: -1000,
    },
    {
      opacity: 1,
      x: 0,
    }
  )
  .fromTo(
    ".footer__top-item",
    {
      y: 50,
    },
    {
      y: 0,
      stagger: 0.15,
    }
  )
  .fromTo(
    ".footer__top-data",
    {
      y: -50,
    },
    {
      y: 0,
      stagger: 0.15,
    }
  )
  .fromTo(
    ".footer__bottom-item",
    {
      y: 100,
    },
    {
      y: 0,
      stagger: 0.15,
    }
  )
  .fromTo(
    ".footer__bottom-copiryight",
    {
      x: 1000,
    },
    {
      x: 0,
      rotation: 360,
    }
  );
