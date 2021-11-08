import { newChar } from "./helpers.js";

export default class DNA {
  constructor(targetLength) {
    this.targetLength = targetLength;

    this.genes = [];
    this.fitness = 0;

    for (let i = 0; i < this.targetLength; i++) {
      this.genes[i] = newChar();
    }
  }

  getPhrase() {
    return this.genes.join("");
  }

  calcFitness(target) {
    let score = 0;

    this.genes.forEach((g, i) => {
      if (g === target.charAt(i)) {
        score++;
      }
    });

    this.fitness = score / target.length;
  }

  crossover(partner) {
    const child = new DNA(this.targetLength);

    const midpoint = Math.floor(Math.random() * this.targetLength);

    for (let i = 0; i < this.targetLength; i++) {
      if (i > midpoint) child.genes[i] = this.genes[i];
      else child.genes[i] = partner.genes[i];
    }

    return child;
  }

  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (Math.random() * 1 < mutationRate) {
        this.genes[i] = newChar();
      }
    }
  }
}
