import Population from "./Population.js";
import { toPercentage } from "./helpers.js";

const bestPhrase = document.getElementById("bestPhrase");
const population = document.getElementById("population");
const mutationRate = document.getElementById("mutationRate");
const averageFitness = document.getElementById("averageFitness");
const totalGeneration = document.getElementById("totalGeneration");
const totalPopulation = document.getElementById("totalPopulation");

function displayPopulationList(pop) {
  population.innerHTML = "";

  const children = pop.map((p) => {
    const li = document.createElement("li");
    li.innerText = p.getPhrase();
    return li;
  });

  population.append(...children);
}

function displayInfo(p) {
  bestPhrase.innerText = p.best;
  totalGeneration.innerText = p.generation;
  totalPopulation.innerText = p.population.length;
  mutationRate.innerText = toPercentage(p.mutationRate);
  averageFitness.innerText = toPercentage(p.averageFitness);

  displayPopulationList(p.population);
}

window.addEventListener("load", () => {
  const population = 200;
  const mutationRate = 0.01;
  const target = "Fraol Lemecha";

  const p = new Population(target, mutationRate, population);

  function loop() {
    if (!p.isFinished()) {
      p.calcFitness();
      p.naturalSelection();
      p.generate();
      p.evaluate();

      displayInfo(p);
    }
  }

  setInterval(loop, 5);
});
