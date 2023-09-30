"use strict";

export class ViewInterface {
  formLoginView = (formModel) => {
    formModel.addForm("form-login", "login");
    formModel.addHeader("Welcome");
    formModel.addInputText("Enter name");
    formModel.addButton("Log in");
    this.appearance(formModel.form);
  };

  formLevelView = (formModel) => {
    formModel.addForm("form-level", "level");
    formModel.addHeader("Difficulty");
    formModel.addInputRadio(["easy", "medium", "hard"]);
    formModel.addButton("Next");
    this.appearance(formModel.form);
  };

  formStartView = (formModel) => {
    formModel.addForm("form-start", "start");
    formModel.addHeader("Mission is to save all citizens from a UFO raid.");
    formModel.addButton("Start");
    this.appearance(formModel.form);
  };

  formOverView = (formModel) => {
    formModel.addForm("form-over", "over");
    formModel.addHeader("Game is over");
    formModel.addButton("Play again");
    this.appearance(formModel.form);
  };

  dashboardView = (model, value) => {
    model.addItem();
    model.addItemValue(value);
  };

  appearance = (element) => {
    element.classList.toggle("active");
  };

  invalid = (element) => {
    element.classList.add("invalid");
  };

  chose = (element) => {
    const choseLabel = element.closest("label");
    choseLabel.classList.add("chose");
  };

  notChose = (element) => {
    const choseLabel = element.closest("label");
    choseLabel.classList.remove("chose");
  };
}
