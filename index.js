// HEADER MENU
const open = document.getElementById("open");
const overlay = document.querySelector(".overlay");
const close = document.getElementById("close");
const overlayBtns = document.querySelectorAll(".overlay li");

open.addEventListener("click", () => {
  overlay.classList.add("show");
  open.classList.add("hide");
});

const closeOverlay = () => {
  overlay.classList.remove("show");
  open.classList.remove("hide");
};
close.addEventListener("click", () => {
  closeOverlay();
});

overlayBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    closeOverlay();
  });
});

// GALLERY SECTION
const thumbnailsUl = document.querySelector(".thumbnails");

const thumbnailImgs = [
  "images/pic01.jpg",
  "images/pic02.jpg",
  "images/pic03.jpg",
  "images/pic04.jpg",
  "images/pic05.jpg",
  "images/pic06.jpg",
  "images/pic07.jpg",
];

let currentIndex = 0;

const mainPhoto = document.querySelector("#main-photo img");
mainPhoto.src = thumbnailImgs[currentIndex];

thumbnailImgs.forEach((image, index) => {
  const img = document.createElement("img");
  img.src = image;

  const li = document.createElement("li");
  if (index === currentIndex) li.classList.add("current");

  li.addEventListener("click", () => {
    mainPhoto.src = image;
    const thumbnails = document.querySelectorAll(".thumbnails > li");
    thumbnails[currentIndex].classList.remove("current");
    currentIndex = index;
    thumbnails[currentIndex].classList.add("current");
  });

  li.appendChild(img);
  thumbnailsUl.appendChild(li);
});

const next = document.getElementById("next");
next.addEventListener("click", () => {
  let target = currentIndex + 1;
  if (target === thumbnailImgs.length) target = 0;
  document.querySelectorAll(".thumbnails > li")[target].click();
});

const prev = document.getElementById("prev");
prev.addEventListener("click", () => {
  let target = currentIndex - 1;
  if (target < 0) target = thumbnailImgs.length - 1;
  document.querySelectorAll(".thumbnails > li")[target].click();
});

// OBSERVERS
function onScrollCallback(entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      header.classList.add("scrolled");
      toTop.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
      toTop.classList.remove("scrolled");
    }
  });
}
const header = document.querySelector("header");
const toTop = document.getElementById("to-top");

const onScrollObserver = new IntersectionObserver(onScrollCallback);

onScrollObserver.observe(document.getElementById("target"));

toTop.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// OBSERVERS FOR ANIMATIONS
const inViewCallback = (entries, obs) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    entry.target.classList.add("appear");
    obs.unobserve(entry.target);
  });
};

const inViewObserver = new IntersectionObserver(inViewCallback, {
  threshold: 0.2,
});

document.querySelectorAll(".animate").forEach((target) => {
  inViewObserver.observe(target);
});

// FORM
const form = document.getElementById("my-form");

async function handleSubmit(event) {
  event.preventDefault();
  const status = document.getElementById("status");
  const data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        status.innerHTML = "Thank you for submitting your message!";
        status.classList.add("succeeded");
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.innerHTML = data["errors"]
              .map((error) => error["message"])
              .join(", ");
            status.classList.add("failed");
          } else {
            status.innerHTML =
              "Oops! There was a problem submitting your message";
            status.classList.add("failed");
          }
        });
      }
    })
    .catch((error) => {
      status.innerHTML = "Oops! There was a problem submitting your message";
      status.classList.add("failed");
    });
}
form.addEventListener("submit", handleSubmit);
