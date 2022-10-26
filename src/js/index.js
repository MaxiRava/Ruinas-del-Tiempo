import { Preloads } from "../scenes/preloads.js";
import { MainMenu } from "../scenes/mainmenu.js";
import { Creditos } from "../scenes/creditos.js";
import { Instrucciones } from "../scenes/instrucciones.js";
import { Tablero } from "../scenes/tablero.js";
import { Cartas } from "../scenes/cartas.js";
import { Escenario1 } from "../scenes/escenario1.js";
import { Escenario2 } from "../scenes/escenario2.js";


localStorage.clear();


const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1920,
      height: 1080,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 450 },
      debug: false,
    },
  },
  // Listado de todas las escenas del juego, en orden
  // La primera escena es con la cual empieza el juego
  scene: [Preloads, MainMenu, Creditos, Instrucciones, Tablero, Cartas, Escenario1, Escenario2 ],
};

const game = new Phaser.Game(config);

