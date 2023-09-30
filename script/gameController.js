"use strict";

import { key } from "./constants.js";
import { gameView } from "./gameView.js";
import { heliport, car, houses, ufos } from "./model.js";
import { checkCollisionWith } from "./utils.js";

/**
 * @param {gameView} view
 */

class Game {
  constructor(view, car, heliport, houses) {
    this.gameField = document.querySelector(".game_field");
    this.view = view;
    this.heliport = heliport;
    this.car = car;
    this.ufos = ufos;
    this.houses = houses;
    this.isOver = false;
  }

  setFieldSizes = () => {
    const fieldSizes = this.gameField.getBoundingClientRect();
    const borderLeft = fieldSizes.left;
    const borderTop = fieldSizes.top;
    const borderRight = fieldSizes.right;
    const borderBottom = fieldSizes.bottom;

    this.gameField.sizes = {
      MAX_X: borderRight - borderLeft,
      MAX_Y: borderBottom - borderTop,
      MIN_X: 0,
      MIN_Y: 0,
    };
  };

  initCar = () => {
    this.car.addModel();
  };

  initHeliport = () => {
    this.heliport.addModel();
    this.heliport.addPopulation();
  };

  initHouse = () => {
    this.houses.forEach((house) => {
      house.addModel();
      house.addPopulation();
    });
  };

  initUfo = () => {
    // this.ufos.forEach((ufo) => {
    //   ufo.addModel();
    //   ufo.generatedPosition();
    //   ufo.generatedDirection();
    // });
  };

  move = () => {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case key.left:
          this.car.toLeft();
          this.view.onMove(this.car);
          break;
        case key.up:
          this.car.toUp();
          this.view.onMove(this.car);
          break;
        case key.right:
          this.car.toRight();
          this.view.onMove(this.car);
          break;
        case key.down:
          this.car.toBottom();
          this.view.onMove(this.car);
          break;
      }
    });
  };

  collisions = () => {
    if (checkCollisionWith(car, heliport)) {
      cancelAnimationFrame(this.collisions);
      car.unload(heliport);
    }

    this.houses.forEach((house) => {
      if (checkCollisionWith(car, house)) {
        cancelAnimationFrame(this.collisions);
        house.unload(car);
      }
    });
    requestAnimationFrame(this.collisions);
  };

  updating = () => {
    this.view.updatePosition(car);
    this.view.updatePopulation(car);
    this.car.getCurrentPosition();
    this.heliport.getCurrentPosition();
    this.view.updatePopulation(heliport);

    this.houses.forEach((house) => {
      this.view.updatePopulation(house);
      house.getCurrentPosition();
    });

    this.ufos.forEach((ufo) => {
      this.view.updatePosition(ufo);
      ufo.getCurrentPosition();
    });

    this.view.animateLoad();

    requestAnimationFrame(this.updating);
  };

  start = () => {
    this.setFieldSizes();
    this.initUfo();
    this.initCar();
    this.initHeliport();
    this.initHouse();
    this.move();
    this.updating();
    this.collisions();
  };

  // over = () => {
  //   while (this.gameField.firstChild) {
  //     this.gameField.removeChild(this.gameField.firstChild);
  //   }
  //   this.isOver = true;
  // };
}

export const newGame = new Game(gameView, car, heliport, houses);
export { heliport };
// currentScore.addItemValue(heliport.population);
// const check = () => {
//   function carHouse() {
//     houses.forEach((el) => {
//       console.log(car.population);
//       car.getCurrentPosition();
//       el.getCurrentPosition();
//       if (checkCollisionWith(car, el)) {
//         setTimeout(() => {
//           el.resetPopulation();
//         }, 500);
//       }
//     });
//   }
//   carHouse();

//   newGame.unloadCarToHeliport();

//   ufos.forEach((el) => {
//     el.getCurrentPosition();
//     if (checkCollisionWith(car, el)) {
//       newGame.over();
//     }
//   });

//   houses.forEach((el) => {
//     el.getCurrentPosition();
//     ufos.forEach((el2) => {
//       el2.getCurrentPosition();
//       if (checkCollisionWith(el2, el)) {
//         el.resetPopulation();
//       }
//     });
//   });
//   requestAnimationFrame(check);
// };

// check();
