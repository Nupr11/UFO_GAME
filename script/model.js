"use strict";

// CONSTANTS
import {
  sizes,
  houseNumber,
  ufoNumber,
  direction,
  start,
  population,
  // intervals,
} from "./constants.js";

//SVG CONFIG
import {
  houseConfig,
  carConfig,
  ufoConfig,
  heliportConfig,
} from "./config_svg.js";

//SUPPORT FUNCTIONS
import { random, generatePosition, generateDirection } from "./utils.js";

//USER VALUES
// import { scoreBox } from "../script/UI_Model/dashboard.js";

// let intervalUfo = intervals[scoreBox.value];

// console.log(intervalUfo);

// CLASSES CREATING
class Model {
  constructor(config) {
    this.element;
    this.elementConfig = config;
    this.gameField = document.querySelector(".game_field");
    this.gameField.sizes = sizes;
    this.width;
    this.height;
    this.direction;
    this.population;
    this.position = start;
    this.isCollision = false;
    this.current = {
      x: null,
      y: null,
    };
  }

  addModel = () => {
    const wrapper = document.createElement("div");
    this.element = document.createElement("object");
    wrapper.className = "wrapper";
    this.gameField.append(wrapper);
    wrapper.append(this.element);

    for (let key in this.elementConfig) {
      this.element[key] = this.elementConfig[key];
    }
    this.getSizes();
  };

  getSizes = () => {
    const elementSizes = this.element.getBoundingClientRect();
    this.width = elementSizes.width;
    this.height = elementSizes.height;
  };

  setStartPosition = (randomX, randomY) => {
    this.position.x = randomX;
    this.position.y = randomY;
  };

  generatedPosition = () => {
    const { randomX, randomY } = generatePosition(this.gameField);
    this.setStartPosition(randomX, randomY);
  };

  getCurrentPosition = () => {
    const currentX = this.element.getBoundingClientRect().x;
    const currentY = this.element.getBoundingClientRect().y;

    [this.current.x, this.current.y] = [currentX, currentY];
  };

  removeModel = () => {
    this.element.remove();
  };

  addPopulation = () => {
    const wrapper = this.element.closest(".wrapper");
    this.populationElement = document.createElement("span");
    wrapper.append(this.populationElement);
  };

  resetPopulation = () => {
    this.population = 0;
  };

  unload = (model) => {
    model.population += this.population;
    this.resetPopulation();
  };

  load = (model) => {
    this.population += model.population;
    model.resetPopulation();
  };
}

export class ModelUfo extends Model {
  setNewPosition = (countedX, countedY) => {
    this.position.x += countedX;
    this.position.y += countedY;

    if (
      this.position.x < this.gameField.sizes.MIN_X ||
      this.position.x > this.gameField.sizes.MAX_X - this.width
    )
      this.removeModel();

    if (
      this.position.y > this.gameField.sizes.MIN_Y ||
      this.position.y < this.gameField.sizes.MAX_Y - this.height
    )
      this.removeModel();
  };

  generatedDirection = () => {
    const { countedX, countedY } = generateDirection(this.position.speed);
    const inner = () => {
      this.setNewPosition(countedX, countedY);
    };
    inner();
  };
}

class ModelCar extends Model {
  constructor(config) {
    super(config);
    this.isMove = false;
    this.population = 0;
  }

  toLeft = () => {
    this.direction = direction.left;
    this.position.x -= this.position.step;
    this.position.x = Math.max(this.position.x, this.gameField.sizes.MIN_X);
  };

  toRight = () => {
    this.direction = direction.right;
    this.position.x += this.position.step;
    this.position.x = Math.min(
      this.position.x,
      this.gameField.sizes.MAX_X - this.width
    );
  };

  toUp = () => {
    this.direction = direction.up;
    this.position.y -= this.position.step;
    this.position.y = Math.max(this.position.y, this.gameField.sizes.MIN_Y);
  };

  toBottom = () => {
    this.direction = direction.down;
    this.position.y += this.position.step;
    this.position.y = Math.min(
      this.position.y,
      this.gameField.sizes.MAX_Y - this.height
    );
  };
}

class ModelHouse extends Model {
  constructor(config) {
    super(config);
    this.population = random(population.max, population.min);
  }
}

class ModelHeliport extends Model {
  constructor(config) {
    super(config);
    this.population = 0;
  }
}

export const car = new ModelCar(carConfig);
export const heliport = new ModelHeliport(heliportConfig);
export const ufos = [];
export const houses = [];

const multiplyHouse = (number = houseNumber) => {
  for (let i = 1; i <= number; i++) {
    const house = new ModelHouse(houseConfig);
    houses.push(house);
  }
};

// const multiplyUfo = () => {
//   setInterval(() => {
//     const ufo = new ModelUfo(ufoConfig);
//     ufos.push(ufo);
//   }, 5000);
// };

multiplyHouse();
// multiplyUfo();
