"use strict";

export class Form {
  constructor() {
    this.container = document.querySelector(".container");
    this.form;
    this.button;
    this.input;
    this.radioInput = [];
    this.text;
  }

  addForm = (name, id) => {
    this.form = document.createElement("form");
    this.form.setAttribute("id", id);
    this.form.setAttribute("name", name);
    this.form.setAttribute("class", "form");
    this.container.append(this.form);
  };

  addHeader = (value) => {
    const header = document.createElement("h2");
    this.form.append(header);
    header.textContent = value;
  };

  addInputText = (value) => {
    const label = document.createElement("label");

    this.text = document.createElement("span");
    this.text.setAttribute("class", "input-title");
    this.text.textContent = value;

    this.input = document.createElement("input");
    this.input.setAttribute("type", "text");
    this.input.setAttribute("class", "form-input");
    this.input.setAttribute("name", "input-name");

    this.form.append(label);
    label.append(this.text);
    label.append(this.input);
  };

  addInputRadio = (levels) => {
    const text = document.createElement("span");
    text.setAttribute("class", "input-title-radio");

    for (let level of levels) {
      const label = document.createElement("label");
      label.textContent = level;
      const input = document.createElement("input");
      input.setAttribute("type", "radio");
      input.setAttribute("class", "form-input");
      input.setAttribute("name", "input-level");
      input.setAttribute("value", level);
      this.radioInput.push(input);
      label.append(input);
      this.form.append(label);
    }
  };

  addButton = (value) => {
    this.button = document.createElement("button");
    this.button.textContent = value;
    this.button.setAttribute("type", "button");
    this.button.setAttribute("class", "form-button");
    this.form.append(this.button);
  };

  getValue = () => this.input.value;

  getChoice = () => {
    const checked = this.radioInput.find((radio) => radio.checked);
    return checked;
  };
}
