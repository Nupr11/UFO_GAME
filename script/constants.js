"use strict";

// HOUSE CONSTANTS
let houseNumber = 26;

// UFO CONSTANTS
let ufoNumber = 30;
// CAR CONSTANTS

// HELIPORT CONSTANTS

// DASHBOARD ITEMS
const DASHBOARD_ITEM_SIZE = 20;

// PLAYER ICON CONSTANTS
let playerWidth = DASHBOARD_ITEM_SIZE;
let playerHeight = DASHBOARD_ITEM_SIZE;

// SCORE ICON CONSTANTS
let scoreWidth = DASHBOARD_ITEM_SIZE;
let scoreHeight = DASHBOARD_ITEM_SIZE;

// LEVEL ICON CONSTANTS
let levelWidth = DASHBOARD_ITEM_SIZE;
let levelHeight = DASHBOARD_ITEM_SIZE;

//START DATA

const sizes = { MAX_X: null, MAX_Y: null, MIN_X: null, MIN_Y: null };

const direction = {
  up: 0,
  right: 90,
  down: 180,
  left: 270,
};

const key = {
  left: "ArrowLeft",
  up: "ArrowUp",
  right: "ArrowRight",
  down: "ArrowDown",
};

const start = {
  x: 0,
  y: 0,
  step: 10,
  speed: 6,
};

const population = {
  max: 55,
  min: 5,
};

let intervals = {
  easy: 6000,
  medium: 4500,
  hard: 3000,
};

export {
  sizes,
  houseNumber,
  ufoNumber,
  playerWidth,
  playerHeight,
  scoreWidth,
  scoreHeight,
  levelWidth,
  levelHeight,
  direction,
  key,
  start,
  population,
  intervals,
};
