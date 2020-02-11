var sword;
var man;
var platform;

var mainState = { //create the main state of the gamed


    preload:function () { //This is used to load the images and the sounds and is called at the beginning

        game.load.image('Little_buddy', 'assets/dude.png', 32, 48); //loads the main character
        game.load.image('Sword', 'assets/sword_sprite.png'); //loads the sword
        game.load.image('Surface', 'assets/platform.png');
        game.load.audio('Play', 'assets/background_music.mp3'); //loads the jump music
    },

    create:function () { //This is used to set up the game, display the sprites, etc and is called after preload

        game.state.backgroundColor = "#000000"; //sets the background to black

        game.physics.startSystem(Phaser.Physics.ARCADE); //set the physics system

        man = game.add.sprite(100, 304, 'Little_buddy'); //this sets the bird sprite at position (100, 245)

        sword = game.add.sprite(10, -50, 'Sword');


        game.physics.arcade.enable(sword);
        game.physics.arcade.enable(man);

        sword.body.gravity.y = 450;

        sword.body.setSize(32, 48, true);

        platform = game.add.image(0, 360, 'Surface');

        game.physics.arcade.enable(platform); //adds physics to the bird

        this.cursor = game.input.keyboard.createCursorKeys();

        this.background_music = game.add.audio('Play');
        this.background_music.loop = true;
        this.background_music.play();

        //this.labelScore = game.add.text(20, 20, "3", {font: "30px Arial", fill: "#ffffff"});
    },

    update:function () { //This is called 60 times per second and contains the game logic

        if(this.cursor.left.isDown){
            man.body.velocity.x = -400;
        }else if (this.cursor.right.isDown){
            man.body.velocity.x = 400;
        }else{
            man.body.velocity.x = 0;
        }

        if(sword.y > 390){

            sword.y = -50;
            sword.x = Math.floor((Math.random() * 330) + 5);
            sword.body.gravity.y = 5;
        }

        game.physics.arcade.overlap(
            man, sword, this.restartGame, null, this);
    },

    restartGame:function () {

        game.state.start('main');
    }
};

var game = new Phaser.Game(400, 390); //Initializes Phaser and creates a 400px by 490px game

game.state.add('main', mainState); //adds the main state and calls it 'main'

game.state.start('main'); //start the state to actually start the game
