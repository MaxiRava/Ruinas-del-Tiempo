let parlante2;
let number;
let valor;
let distancia;
let distancia2;
let boton;
let final;
let turno;
let audio2;

import { EN_US } from "../enums/languages";
import { ES_AR } from "../enums/languages";
import { getTranslations} from "../services/translations";
import { getPhrase } from "../services/translations";

export class Tablero extends Phaser.Scene {
    constructor() {
      super("Tablero");
    }
    preload() {
      this.load.tilemapTiledJSON("map", "public/assets/tilemaps/tablero.json");
      this.load.image("tilesBelow", "public/assets/images/cueva-atlas.png");
      this.load.image("tilesPlatform", "public/assets/images/casilas atlas.png");
    }

    init(data) {
      
      distancia = data.distancia;
      distancia2 = data.distancia2;
      turno = data.turno;
      this.movimiento = data.movimiento;
      this.contar = data.contar;
      audio2 = data.audio2;
      console.log(data)

      
    }

    create() {
      this.gameOver=false;
      const map = this.make.tilemap({ key: "map" });

      const tilesetBelow = map.addTilesetImage("cueva-atlas", "tilesBelow");
  
      const tilesetPlatform = map.addTilesetImage(
        "casilas atlas",
        "tilesPlatform"
      );
    
  
      const belowLayer = map.createLayer("Fondo", tilesetBelow, 0, 0);
      const worldLayer = map.createLayer("Plataformas", tilesetPlatform, 0, 0);
      const objectsLayer = map.getObjectLayer("Objetos");
  
      worldLayer.setCollisionByProperty({ collides: true });


      const spawnPoint = map.findObject("Objetos", (obj) => obj.name === "final");
      final = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "banderaTablero");

      this.player2 = this.physics.add.sprite(distancia2, 862.83, "prota2").setCollideWorldBounds(true);
      this.player = this.physics.add.sprite(distancia, 862.83, "prota").setCollideWorldBounds(true);
      
  
      this.physics.add.collider(this.player, worldLayer);
      this.physics.add.collider(this.player2, worldLayer);
      this.physics.add.collider(final, worldLayer);
      
      let letrero
      let cara

      if (turno===0) {
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
        this.player.setScale(1.1);
        letrero = "Turno Jugador 1"
        cara = "cara1"
      }else{
        this.cameras.main.startFollow(this.player2, true, 0.08, 0.08);
        this.player2.setScale(1.1);
        letrero = "Turno Jugador 2"
        cara = "cara2"

      }
       
      this.cameras.main.setZoom(2);

      this.cameras.main.setBounds(0, 0, 1952, 1080); 



      let iconoSonido= "music2"
      
      if (this.contar === 1) {
        iconoSonido= "mute2"
        audio2.play();
        audio2.pause();
      }

      parlante2 = this.add.image(1395, 310 ,iconoSonido).setInteractive()
      
      .on('pointerdown', () => {

        if(this.contar === 0){
          iconoSonido= "mute2"
          this.contar = 1
          audio2.pause()
          parlante2.setTexture(iconoSonido)
        }else{
          if (this.contar === 1){
            iconoSonido= "music2"
            this.contar = 0
            audio2.resume()
            parlante2.setTexture(iconoSonido)
          }
        }
      })

      .on('pointerover', () => {
        parlante2.setScale(1.1)
      })

      .on('pointerout', () => {
        parlante2.setScale(1)
      })

      parlante2.setScrollFactor(0);

      this.physics.add.overlap(this.player, final, this.hitFinal, null, this);
      this.physics.add.overlap(this.player2, final, this.hitFinal2, null, this);

      this.add.image(960, 320  ,"turnoJugador").setScrollFactor(0)
      let pj = this.add.image(1150, 320  ,cara).setScrollFactor(0)
      let cartelTurno = this.add.text(790, 290, letrero, { stroke: 'black', strokeThickness: 5, fontSize: '50px Arial', fill: 'white' });
      cartelTurno.setScrollFactor(0);


      boton = this.add.image(540, 325  ,"dado").setInteractive()

      
      .on('pointerdown', () => {
        
        parlante2.destroy()
        boton.destroy()
        this.updateTexto()

        //texto = this.add.text(x, y, `Turno Jugador 1`, { stroke: 'black', strokeThickness: 5, fontSize: '54px Arial', fill: 'white' });
       
        if (turno === 0) {

          number = this.add.text(this.cameras.main.midPoint.x ,this.cameras.main.midPoint.y - 100, valor, { stroke: 'black', strokeThickness: 5, fontSize: '75px Arial', fill: 'white' })
        
        setTimeout(() => {
          number.destroy()
          this.player.setX(distancia + 128 * valor)
          this.player.setScale(1)
          turno === 1
          }, 3000)

        setTimeout(() => {
          letrero = "Turno Jugador 2"
          cartelTurno.setText(letrero)

          cara="cara2"
          pj.setTexture(cara)
          
          this.cameras.main.startFollow(this.player2)
          this.player2.setScale(1.1)
          }, 5000)

        

        setTimeout(() => {
          this.scene.start("Cartas", { distancia : this.player.x, distancia2: this.player2.x, audio2:audio2, contar:this.contar, turno:1, movimiento: 1, valor:valor   }
         )}, 8000)

         
        }
        
        if (turno === 1) {
          
          number = this.add.text(this.cameras.main.midPoint.x ,this.cameras.main.midPoint.y-100, valor, { stroke: 'black', strokeThickness: 5, fontSize: '75px Arial', fill: 'white' })
        
        setTimeout(() => {
          number.destroy()
          this.player2.setX(distancia2 + 128 * valor)
          this.player2.setScale(1)
          turno === 0
          }, 3000)

        setTimeout(() => {
          letrero = "Turno Jugador 1"
          cartelTurno.setText(letrero)

          cara="cara1"
          pj.setTexture(cara)

          this.cameras.main.startFollow(this.player)
          this.player.setScale(1.1)
          }, 5000)

        setTimeout(() => {
            this.scene.start("Cartas", { distancia : this.player.x, distancia2: this.player2.x, audio2:audio2, contar:this.contar, turno:0, movimiento: 1, valor:valor   }
           )}, 8000)
         
        }
        
        
        })
        .on('pointerover', () => {
          boton.setScale(1.1)
        })
    
        .on('pointerout', () => {
          boton.setScale(1)
        })

        
        boton.setScrollFactor(0);

        if (this.movimiento === 0) {
          boton.destroy();

          setTimeout(() => {
            this.scene.start("Cartas", { distancia : this.player.x, distancia2: this.player2.x, audio2:audio2, contar:this.contar, turno:turno, movimiento: 1, valor:valor   })
    
            }, 3000)
        }
 
    }
    
    updateTexto(){
      valor = Phaser.Math.Between(1, 6);
     
    }

    hitFinal(player, final){

      this.gameOver = true;
     
      this.physics.pause();
     
      this.cameras.main.startFollow(this.player);
      turno = 0;
      
      boton.destroy();
      parlante2.destroy();
      setTimeout(() => {

        this.cameras.main.stopFollow()
        this.add.image(this.cameras.main.midPoint.x ,this.cameras.main.midPoint.y, "completo");

        let otro = this.add.image(this.cameras.main.midPoint.x ,this.cameras.main.midPoint.y, "botone").setInteractive()
        
        .on('pointerdown', () => {
          
          this.scene.start(
            "Preloads")
        })
      
      .on('pointerover', () => {
          otro.setScale(1.1)
        })
      
      .on('pointerout', () => {
          otro.setScale(1)
        })
         
       }, 2000)
    }

    hitFinal2(player2, final){

      this.gameOver = true;
     
      this.physics.pause();
     
      this.cameras.main.startFollow(this.player);
      turno = 0;
      
      boton.destroy();
      parlante2.destroy();
      setTimeout(() => {

        this.cameras.main.stopFollow()
        this.add.image(this.cameras.main.midPoint.x ,this.cameras.main.midPoint.y, "completo");

        let otro = this.add.image(this.cameras.main.midPoint.x ,this.cameras.main.midPoint.y, "botone").setInteractive()
        
        .on('pointerdown', () => {
          
          this.scene.start(
            "Preloads")
        })
      
      .on('pointerover', () => {
          otro.setScale(1.1)
        })
      
      .on('pointerout', () => {
          otro.setScale(1)
        })
         
       }, 2000)
    }

    update(){


  }

}