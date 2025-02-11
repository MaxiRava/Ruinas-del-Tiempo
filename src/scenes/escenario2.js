let player;
let tachos;
//let rooks;
let gatos;
let final;
let cursors;
let gameOver;
let count;
let number;
let isJumping;
let distancia;
let distancia2;
let turno;
let audio3;
let audio2;
var texto;


export class Escenario2 extends Phaser.Scene {
    constructor() {

      super("Escenario2");
    }

    preload() {
      this.load.tilemapTiledJSON("map2", "public/assets/tilemaps/esc2.json");
      this.load.image("tilesBelow2", "public/assets/images/fondonoche - atlas.png");
      this.load.image("tilesPlatform2", "public/assets/images/plataforma noche - atlas.png");
    
    }
    init(data) {

      distancia = data.distancia;
      distancia2 = data.distancia2;
      turno = data.turno;
      this.movimiento = data.movimiento;
      this.contar=data.contar;
      audio2=data.audio2;
      
    }
    create() {

      
  
      audio3 = this.sound.add('theme3', {loop: true});
      audio3.play();
  
      const map2 = this.make.tilemap({ key: "map2" });

      const tilesetBelow2 = map2.addTilesetImage("fondonoche - atlas", "tilesBelow2");
  
      const tilesetPlatform2 = map2.addTilesetImage(
        "plataforma noche - atlas",
        "tilesPlatform2"
      );
  
      const belowLayer = map2.createLayer("Fondo", tilesetBelow2, 0, 0);
      const worldLayer = map2.createLayer("Plataformas", tilesetPlatform2, 0, 0);
      const objectsLayer = map2.getObjectLayer("Objetos");
  
      worldLayer.setCollisionByProperty({ collides: true });
  
      const spawnPoint = map2.findObject("Objetos", (obj) => obj.name === "dude");

      player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "dude2")
      .setCircle(50, 40, 40);
    
      //player.setCollideWorldBounds(true);
      player.anims.play("run2");
      
      isJumping = false;

      const spawnPoint2 = map2.findObject("Objetos", (obj) => obj.name === "final");
      final = this.physics.add.sprite(spawnPoint2.x, spawnPoint2.y, "banderaciudad");

      cursors = this.input.keyboard.createCursorKeys();
    

      tachos = this.physics.add.group();
      //rooks = this.physics.add.group();
      gatos = this.physics.add.group();
      

      objectsLayer.objects.forEach((objData) => {

      const { x = 0, y = 0, name, type } = objData;
      switch (name) {
        case "tacho": {

          const tacho = tachos.create(x, y, "tacho");
          
          break;
        }
        case "gato": {

          const gato = gatos.create(x, y, "gato");
          
          break;
        }
      } 
    });
    
      count = 0;
      number= 3;
       
      this.physics.add.collider(player, worldLayer);
      this.physics.add.collider(tachos, worldLayer);
      //this.physics.add.collider(rooks, worldLayer);
      this.physics.add.collider(gatos, worldLayer);
      this.physics.add.collider(final, worldLayer);
  
      this.physics.add.overlap(player, tachos, this.hitTacho, null, this);
      //this.physics.add.overlap(player, rooks, this.hitRook, null, this);
      this.physics.add.overlap(player, gatos, this.hitGato, null, this);
      this.physics.add.overlap(player, final, this.hitFinal, null, this);
  
      texto = this.add.text(330 ,200, `Vidas: ${number}`, { stroke: 'black', strokeThickness: 5, fontSize: '54px Arial', fill: 'white' });
      
      texto.setScrollFactor(0);
     

      gameOver = false;

      this.cameras.main.startFollow(player, true, 0.08, 0.08);
    
      this.cameras.main.setZoom(1.5);
      
      this.cameras.main.setBounds(0, 0, 3200, 960);
    }

    hitTacho(player,tacho) {
      tacho.destroy();
      count = count + 1;
      this.physics.pause();
  
      player.setTint(0xff0000);
    
      player.anims.play("jump2");
      

      setTimeout(() => {
        
        this.physics.resume();
  
        player.clearTint();
        
        player.anims.play("run2");
        
        number = 3 - count;
        texto.setText(`Vidas: ${number}`);
        

      }, 900); 
    }
/*
    hitRook(player,rook) {
      rook.destroy();
      count = count + 1;
      
      this.physics.pause();
  
      player.setTint(0xff0000);
    
      player.anims.play("jump");
      

      setTimeout(() => {
        
        this.physics.resume();
  
        player.clearTint();
        
        player.anims.play("run");

        number = 3 - count;
        texto.setText(`Vidas: ${number}`);
       

      }, 900); 
    }
*/
    hitGato(player,gato) {
      gato.destroy();
      count = count + 1;
      
      this.physics.pause();
  
      player.setTint(0xff0000);
    
      player.anims.play("jump2");
      

      setTimeout(() => {
        this.physics.resume();
  
        player.clearTint();
        
        player.anims.play("run2");
        
        number = 3 - count;
        texto.setText(`Vidas: ${number}`);
        

      }, 900); 
    }

    hitFinal(player,final) {

      texto.destroy();
      this.cameras.main.stopFollow();
      this.physics.pause();
      player.anims.play("jump2");
      let victory = this.add.image(this.cameras.main.midPoint.x - 6 ,this.cameras.main.midPoint.y - 45, "victoria2");
      let boton = this.add.image(this.cameras.main.midPoint.x - 19,this.cameras.main.midPoint.y + 118, "botone2").setInteractive()

      .on('pointerdown', () => {
        audio3.stop()
        audio2.play()
        this.scene.start("Tablero", { distancia : distancia, distancia2:distancia2, turno:turno, movimiento : 1, audio2:audio2, contar:this.contar }
      )
      })
      .on('pointerover', () => {
        boton.setScale(1.1)
      })
  
    .on('pointerout', () => {
        boton.setScale(1)
      })

    }

  update(){
    
    player.setVelocityX(100);

    if (gameOver) {
      return;
    };

    if (cursors.up.isDown && player.body.blocked.down) {
      player.setVelocityY(-520);
      player.setVelocityX(200);
      player.anims.play("jump2");
      isJumping = true;
    } else {
      if (isJumping && player.body.blocked.down) {
        player.anims.play("run2");
        player.setVelocityX(100);
        isJumping = false;
      }
    }

    if (count === 3){
    
      setTimeout(() => {
        gameOver= true; 
        
        this.cameras.main.stopFollow();
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play("jump2");

        let derrota =this.add.image(this.cameras.main.midPoint.x - 6 ,this.cameras.main.midPoint.y - 45, "derrota2")
        let boton =this.add.image(this.cameras.main.midPoint.x - 19,this.cameras.main.midPoint.y + 130, "botone2").setInteractive()
        .on('pointerdown', () => {

          audio3.stop()
          audio2.play()
          
          if (turno === 1) {
            turno= 0
          }else{
            if (turno === 0){
              turno = 1
            } 
          }
      
          this.scene.start("Tablero", {distancia : distancia, distancia2:distancia2, turno:turno, movimiento: 0, audio2:audio2, contar:this.contar})
        })
        .on('pointerover', () => {
          boton.setScale(1.1)
        })
    
      .on('pointerout', () => {
          boton.setScale(1)
        })

      }, 900); 
      
    }
    
  }
}