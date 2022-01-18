import DNA from "./DNA.js";

export default class Population {
  constructor(target, mutationRate, popMax) {
    this.popMax = popMax;
    this.target = target;
    this.mutationRate = mutationRate;

    this.best = "";
    this.matingPool = [];
    this.population = [];
    this.generation = 0;
    this.averageFitness = 0;

    for (let i = 0; i < this.popMax; i++) {
      this.population[i] = new DNA(this.target.length);
    }
    this.calcFitness();
  }

  calcFitness() {
    this.population.forEach((p) => {
      p.calcFitness(this.target);
    });
    this.setAverageFitness();
  }

  setAverageFitness() {
    this.averageFitness =
      this.population.reduce((prev, curr) => prev + curr.fitness, 0) /
      this.population.length;
  }

  naturalSelection() {
    this.matingPool = [];

    let maxFitness = 0;
    this.population.forEach((p) => {
      if (p.fitness > maxFitness) {
        maxFitness = p.fitness;
      }
    });

    this.population.forEach((p) => {
      const fitness = Math.floor(p.fitness * 100);

      for (let i = 0; i < fitness; i++) {
        this.matingPool.push(p);
      }
    });
  }

  generate() {
    for (let i = 0; i < this.population.length; i++) {
      const a = Math.floor(Math.random() * this.matingPool.length);
      const b = Math.floor(Math.random() * this.matingPool.length);

      const partnerA = this.matingPool[a];
      const partnerB = this.matingPool[b];

      const child = partnerA.crossover(partnerB);

      child.mutate(this.mutationRate);
      this.population[i] = child;
    }

    this.generation++;
  }

  evaluate() {
    let maxFitness = { i: 0, fitness: 0 };
    this.population.forEach((p, i) => {
      if (p.fitness > maxFitness.fitness) {
        maxFitness = {
          i,
          fitness: p.fitness,
        };
      }
    });

    this.best = this.population[maxFitness.i].getPhrase();
  }

  isFinished() {
    return this.best === this.target;
  }
}
