"use strict";

import { trimmed, deCapitalizeName } from "./utils.js";

export class PlayerStorage {
  constructor(hash = {}) {
    this.storage = hash;
  }

  checkName = (str) => {
    const trimmedName = trimmed(str);
    const deCapitalizedName = deCapitalizeName(trimmedName);
    return deCapitalizedName;
  };

  addPlayer = (player, score = 0) => {
    const checkedPlayer = this.checkName(player);

    if (!this.storage[checkedPlayer]) {
      this.storage[checkedPlayer] = score;
    }

    this.storage[checkedPlayer] = Math.max(this.storage[checkedPlayer], score);
  };

  getScore = (player) => {
    return this.storage[player] || 0;
  };
}
