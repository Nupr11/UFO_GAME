"use strict";

// SUPPORT FUNCTIONS

const trimmed = (str) => str.trim();
const deCapitalizeName = (str) => str.toLowerCase();

function toSetAttribute(element, attributes) {
  for (let attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }
}

function isEmpty(str) {
  if (str === "") {
    isEmpty();
  }
}

function random(max, min) {
  const randomized = Math.trunc(min + Math.random() * (max - min));
  return randomized;
}

const generateDirection = (startSpeed) => {
  const randomAngle = Math.random() * 2 * Math.PI;
  const countedX = Math.cos(randomAngle) * startSpeed;
  const countedY = Math.sin(randomAngle) * startSpeed;

  return { countedX, countedY };
};

const generatePosition = (element) => {
  const randomX = random(element.sizes.MAX_X, element.sizes.MIN_X);
  const randomY = random(element.sizes.MAX_Y, element.sizes.MIN_Y);

  return { randomX, randomY };
};

const checkCollisionWith = (object1, object2) => {
  return (
    object1.current.x < object2.current.x + object2.width &&
    object1.current.x > object2.current.x &&
    object1.current.y < object2.current.y + object2.width &&
    object1.current.y > object2.current.y
  );
};

export {
  toSetAttribute,
  trimmed,
  deCapitalizeName,
  isEmpty,
  random,
  generateDirection,
  generatePosition,
  checkCollisionWith,
};
