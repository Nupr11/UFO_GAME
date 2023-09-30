"use strict";

const formButton = document.querySelector(".form-button");
const input = document.querySelectorAll(".form-input");
const text = document.querySelectorAll(".input-title");

for (const item of input) {
  item.addEventListener("focus", () => {
    const index = Array.from(input).indexOf(item);
    text[index].classList.add("focused");
  });

  item.addEventListener("blur", () => {
    const index = Array.from(input).indexOf(item);
    if (item.value === "") {
      text[index].classList.remove("focused");
    }
  });
}

const heliportAnimation = document.styleSheets[0].insertRule(
  `
@keyframes appear1 {
  0% {
   opacity: .9;
   transform: scale(1.0)
  }
  50% {
   opacity: 1;
   transform: scale(0.95)
  }
  100% {
    opacity: .9;
    transform: scale(1.0)
   }
}
`,
  2
);

const ufoAnimation = document.styleSheets[0].insertRule(
  `
@keyframes appear2 {
  0% {
   opacity: .6;
   transform: scale(1.1)
  }
  100% {
   opacity: 1;
   transform: scale(1)
  }
}
`,
  2
);
