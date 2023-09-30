"use strict";
// import { moveAudio, ufoAudio } from "./config_audio";

export class GameView {
  constructor() {
    this.heliport = document.querySelector(".heliport");
    this.ufos = document.querySelectorAll(".ufo");
    this.gameField = document.querySelector(".game_field");
    this.populationElement = document.querySelectorAll(".wrapper > span");
  }

  updatePosition = (model) => {
    model.element.style.top = `${model.position.y}px`;
    model.element.style.left = `${model.position.x}px`;
  };

  updateDirection = (model) => {
    const rotation = `rotate(${model.direction}deg)`;
    model.element.style.transform = rotation;
  };

  onMove = (model) => {
    this.updateDirection(model);
    this.updatePosition(model);
  };

  updatePopulation = (model) => {
    if (model.populationElement) {
      model.populationElement.textContent = model.population;
    }
  };

  animateLoad = () => {
    this.populationElement.forEach((el) => {
      el.textContent === "0"
        ? (el.style.backgroundColor = "red")
        : (el.style.backgroundColor = "green");
    });
  };

  animateHeliport = () => {
    this.heliport.style.animation = "appear1 3s infinite";
  };
}

export const gameView = new GameView();
