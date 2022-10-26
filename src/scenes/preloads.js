
export class Preloads extends Phaser.Scene {
  constructor() {
 
    super("Preloads");
  }

  preload() {
    this.#language

    this.load.image("cueva", "public/assets/images/cueva1.png");
    this.load.image("cueva2", "public/assets/images/cueva22.png");
    this.load.image("inicio", "public/assets/images/Ruinas_del_tiempo.png");
    this.load.image("jugar", "public/assets/images/jugar.png");
    this.load.image("credito", "public/assets/images/credi.png");
    this.load.image("creditos", "public/assets/images/Creditos.png");
    this.load.image("music", "public/assets/images/sonido.png");
    this.load.image("mute", "public/assets/images/sin sonido.png");
    this.load.image("music2", "public/assets/images/sonido2.png");
    this.load.image("mute2", "public/assets/images/sin sonido2.png");
    this.load.image("volver", "public/assets/images/retroceso.png");
    this.load.image("dale", "public/assets/images/Intrucciones.png");
    this.load.image("intro", "public/assets/images/saltar intro.png");
    this.load.image("dado", "public/assets/images/dados.png");
     this.load.image("turnoJugador", "public/assets/images/Turno_jugador.png");
    this.load.image("carta", "public/assets/images/carta.png");
    this.load.image("elegirCarta", "public/assets/images/Elige_tu_destino.png");
    this.load.image("cara1", "public/assets/images/cara_de_costado.png");
    this.load.image("cara2", "public/assets/images/cara_2_de_costado.png");
    this.load.image("cartabuena", "public/assets/images/carta buena.png");
    this.load.image("cartacorrer", "public/assets/images/carta correr.png");
    this.load.image("completo", "public/assets/images/JUEGO COMPLETADO.png");
    this.load.image("victoria", "public/assets/images/pop ups victoria derrota/Victoria Jungla.png");
    this.load.image("derrota", "public/assets/images/pop ups victoria derrota/Derrota Jungla.png");
    this.load.image("victoria2", "public/assets/images/pop ups victoria derrota/Victoria Ciudad.png");
    this.load.image("derrota2", "public/assets/images/pop ups victoria derrota/Derrota Ciudad.png");
    this.load.image("botone", "public/assets/images/pop ups victoria derrota/boton2.png");
    this.load.image("botone2", "public/assets/images/pop ups victoria derrota/boton_de_ciudad.png");
    this.load.image("banderaTablero", "public/assets/images/Victoria tablero.png");
    this.load.image("banderaEsc", "public/assets/images/Victoria jungla.png");
    this.load.image("banderaciudad", "public/assets/images/victoriaciudad.png");
    this.load.image("roca", "public/assets/images/PIEDRAS2.png");
    this.load.image("roca2", "public/assets/images/PIEDRAS3.png");
    this.load.image("snake", "public/assets/images/snake.png");
    this.load.image("tacho", "public/assets/images/tacho.png");
    this.load.image("gato", "public/assets/images/gato.png");
    this.load.image("prota", "public/assets/images/prota.png");
    this.load.image("prota2", "public/assets/images/prota2.png");
    this.load.spritesheet("dude", "public/assets/images/spritesheet (5).png", {
      frameWidth: 150,
      frameHeight: 155,
    });
    this.load.spritesheet("dude2", "public/assets/images/spritesnoche.png", {
      frameWidth: 116,
      frameHeight: 155,
    });

  
    this.load.audio("theme", "public/assets/sounds/musica.mp3");
    this.load.audio("theme2", "public/assets/sounds/tablero.mp3");
    this.load.audio("theme3", "public/assets/sounds/jungla.mp3");

  }

  create() {
    
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 2 }),
      frameRate: 7,
      repeat: -1,
    });
   
    this.anims.create({
      key: "jump",
      frames: [{ key: "dude", frame: 1 }],
      frameRate: 20,
    });
    
    let audio = this.sound.add('theme', {loop: true});
    audio.play();
    this.scene.start("MainMenu", {distancia:75, distancia2:65, turno:0, audio:audio, contar:0}
    );


    this.anims.create({
      key: "run2",
      frames: this.anims.generateFrameNumbers("dude2", { start: 0, end: 2 }),
      frameRate: 7,
      repeat: -1,
    });
   
    this.anims.create({
      key: "jump2",
      frames: [{ key: "dude2", frame: 3 }],
      frameRate: 20,
    });
  }

  async getTranslation(){

  }
}
