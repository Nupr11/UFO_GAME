"use strict";
// import { heliport } from "../script/model.js";
import { PlayerStorage } from "../players.js";
import { ViewInterface } from "../UI_View/view.js";
import { newGame, heliport } from "../gameController.js";
import { Form } from "../UI_Model/form.js";
import {
  playerBox,
  scoreBox,
  levelBox,
  currentScore,
} from "../UI_Model/dashboard.js";

const scoreStorage = new PlayerStorage();
const interfaceView = new ViewInterface();
const formLogin = new Form();
const formLevel = new Form();
const formStart = new Form();
const formOver = new Form();

class Controller {
  constructor(storageModel) {
    this.storage = storageModel;
    this.dashboard = document.querySelector(".game_dashboard");
    this.game = document.querySelector(".game");
  }

  phaseLogin = (model, view) => {
    view.formLoginView(model);

    model.button.addEventListener("click", () => {
      let inner = () => {
        let userName = model.getValue();
        if (userName !== "") {
          this.storage.addPlayer(userName);
          const userScore = this.storage.getScore(userName);
          view.appearance(model.form);
          view.dashboardView(playerBox, userName);
          view.dashboardView(scoreBox, userScore);
          this.phaseLevel(formLevel, interfaceView);
        } else {
          view.invalid(model.input);
          view.invalid(model.text);
        }
      };
      inner();
    });
  };

  phaseLevel = (model, view) => {
    view.formLevelView(model);
    view.dashboardView(currentScore);
    model.radioInput.forEach((item) => {
      item.addEventListener("click", () => {
        model.radioInput.forEach((item) => view.notChose(item));
        view.chose(model.getChoice());
      });
    });

    model.button.addEventListener("click", () => {
      const userLevel = model.getChoice();
      let inner = () => {
        if (userLevel === undefined) {
          model.radioInput.forEach((item) => view.invalid(item));
        }
        inner();
      };
      let value = userLevel.value;
      view.dashboardView(levelBox, value);
      view.appearance(model.form);
      view.appearance(this.dashboard);
      this.phaseRules(formStart, interfaceView);
    });
  };

  phaseRules = (model, view) => {
    view.formStartView(model);
    model.button.addEventListener("click", () => {
      view.appearance(model.form);
      view.appearance(this.game);
      this.phaseGame();
    });
  };

  phaseGame = () => {
    newGame.start();
  };

  update = () => {
    currentScore.value.innerHTML = heliport.population;
    requestAnimationFrame(this.update);
  };

  phaseGameOver = (model, view) => {
    if (newGame.isOver) {
      view.formOverView(model);
      model.button.addEventListener("click", () => {
        location.reload();
      });
    } else if (!newGame.isOver) {
      requestAnimationFrame(() => this.phaseGameOver(model, view));
    }
  };
}

const phases = new Controller(scoreStorage);
phases.phaseLogin(formLogin, interfaceView);
phases.phaseGameOver(formOver, interfaceView);
