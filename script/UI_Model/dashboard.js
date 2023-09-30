"use strict";

import {
  playerWidth,
  playerHeight,
  scoreWidth,
  scoreHeight,
  levelWidth,
  levelHeight,
} from "../constants.js";

// CONFIG ELEMENTS
const dashboardItems = {
  player: {
    className: "box player",
    data: "/assets/svg/player.svg",
    type: "image/svg+xml",
    width: playerWidth,
    height: playerHeight,
  },

  score: {
    className: "box score",
    data: "/assets/svg/score.svg",
    type: "image/svg+xml",
    width: scoreWidth,
    height: scoreHeight,
  },

  level: {
    className: "box level",
    data: "/assets/svg/level.svg",
    type: "image/svg+xml",
    width: levelWidth,
    height: levelHeight,
  },

  current: {
    textContent: "current score:",
  },
};

// CLASSES CREATING
export class DashboardItem {
  constructor(config) {
    this.dashboard = document.querySelector(".game_dashboard");
    this.config = config;
    this.box;
    this.value;
    this.currentScore = 0;
  }

  addItem = () => {
    this.box = document.createElement("div");
    this.box.className = "game_dashboard-box";

    const icon = document.createElement("object");

    for (let key in this.config) {
      icon[key] = this.config[key];
    }

    this.dashboard.append(this.box);
    this.box.append(icon);
  };

  addItemValue = (value = 0) => {
    this.value = document.createElement("span");
    this.value.innerHTML = value;
    this.box.append(this.value);
  };

  getItemValue = () => {
    const itemValue = this.value.value;
    return itemValue;
  };
}

const playerBox = new DashboardItem(dashboardItems.player);
const scoreBox = new DashboardItem(dashboardItems.score);
const currentScore = new DashboardItem(dashboardItems.current);
const levelBox = new DashboardItem(dashboardItems.level);

export { playerBox, scoreBox, levelBox, currentScore };
