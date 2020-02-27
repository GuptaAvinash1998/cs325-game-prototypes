var crazy_lady;
var timer;
var mouse;
var cats;
var angryCat;
var playerCat;
var net;
var kitty_pur;
var warning;
var haha;
var beat;

GameStates.mainState = function(game){ //create the main state of the gamed

    return {
        preload: function () { //This is used to load the images and the sounds and is called at the beginning

            //this.load.image('Background', 'assets/background.png');
            this.load.image('Cat', 'assets/cat.png'); //https://www.iconfinder.com/icons/4050595/animal_cartoon_cat_face_head_pet_icon
            this.load.image('Angry_Pusheen', 'assets/angry_push.jpg'); //https://www.hiclipart.com/free-transparent-background-png-clipart-hpiam
            this.load.image('Crazy_cat_lady', 'assets/crazy_cat_lady.png'); //https://simpsons.fandom.com/wiki/Eleanor_Abernathy
            this.load.audio('Meow', 'assets/meow.wav'); //https://freesound.org/people/InspectorJ/sounds/415209/
            this.load.audio('HAHA', 'assets/haha-2.wav'); //http://www.geocities.ws/Nashville/Stage/6021/haha-2.wav
            this.load.audio('Beat', 'assets/in_the_beat.wav'); //https://freesound.org/people/zagi2/sounds/223475/


        },

        create: function () { //This is used to set up the game, display the sprites, etc and is called after preload

            game.physics.startSystem(Phaser.Physics.ARCADE); //set the physics system

            crazy_lady = game.add.sprite(0, 0, 'Crazy_cat_lady'); //this sets the crazy_lady sprite at position (100, 245)

            game.physics.arcade.enable(crazy_lady); //adds physics to the crazy_lady

            crazy_lady.body.setSize(40, 53, true);
            crazy_lady.body.collideWorldBounds = true;
            crazy_lady.anchor.setTo(0.5, 0.5);

            cats = game.add.group();
            cats.enableBody = true;
            cats.physicsBodyType = Phaser.Physics.ARCADE;
            cats.setAll('checkWorldBounds', true);
            cats.setAll('outOfWorldBoundsKill', true);

            playerCat = game.add.sprite(10, game.world.centerY + 40, 'Cat');
            playerCat.inputEnabled = true;
            playerCat.input.enableDrag(true);
            game.physics.arcade.enable(playerCat);

            game.time.events.repeat(Phaser.Timer.SECOND * 2, Number.POSITIVE_INFINITY, this.throw_cats, this);

            kitty_pur = game.add.audio('Meow');

            //game.time.events.repeat(Phaser.Timer.SECOND * )
            warning = game.add.text(0, game.world.centerY - 100, "PLEASE CLICK THE CAT!!",
                {font: "30px Arial", fill: "#ff0044", align: "left"});
            warning.alpha = 0;

            haha = game.add.audio('HAHA');
            beat = game.add.audio('Beat');
            beat.play();

        },

        update: function () { //This is called 60 times per second and contains the game logic

            //net.rotation = game.physics.arcade.accelerateToPointer(net, game.input.activePointer, 900, 900);
            crazy_lady.rotation = game.physics.arcade.accelerateToPointer(crazy_lady, game.input.activePointer, 600, 600);

            if (!this.input.activePointer.isDown) {

                game.add.tween(warning).to({alpha: 1}, 20, "Linear", true);
            } else {
                game.add.tween(warning).to({alpha: 0}, 20, "Linear", true);
            }

            game.physics.arcade.overlap(playerCat, crazy_lady, this.deathCase1, null, this);
            game.physics.arcade.overlap(playerCat, cats, this.deathCase2, null, this);

        },

        throw_cats: function () {

            //cats.createMultiple(4, 'cats');
            let i = 0;
            for (; i < 4; i++) {

                if (i === 0) {

                    angryCat = game.add.sprite(crazy_lady.body.x + 10, crazy_lady.body.y, 'Angry_Pusheen');
                    cats.add(angryCat);
                    game.physics.enable(angryCat, Phaser.Physics.ARCADE);
                    angryCat.body.velocity.x = 500;
                }

                if (i === 1) {
                    angryCat = game.add.sprite(crazy_lady.body.x - 10, crazy_lady.body.y, 'Angry_Pusheen');
                    cats.add(angryCat);
                    game.physics.enable(angryCat, Phaser.Physics.ARCADE);
                    angryCat.body.velocity.x = -500;
                }

                if (i === 2) {
                    angryCat = game.add.sprite(crazy_lady.body.x, crazy_lady.body.y + 10, 'Angry_Pusheen');
                    cats.add(angryCat);
                    game.physics.enable(angryCat, Phaser.Physics.ARCADE);
                    angryCat.body.velocity.y = 500;
                }

                if (i === 3) {
                    angryCat = game.add.sprite(crazy_lady.body.x, crazy_lady.body.y - 10, 'Angry_Pusheen');
                    cats.add(angryCat);
                    game.physics.enable(angryCat, Phaser.Physics.ARCADE);
                    angryCat.body.velocity.y = -500;
                }
            }

            kitty_pur.play();

        },

        deathCase1: function () {

            haha.play();
            beat.stop();
            game.state.start('Lose');
        },

        deathCase2: function () {

            haha.play();
            beat.stop();
            game.state.start('Lose');
        }
    }
};

//var game = new Phaser.Game(350, 350); //Initializes Phaser and creates a 400px by 490px game

//game.state.add('main', mainState); //adds the main state and calls it 'main'

//game.state.start('main'); //start the state to actually start the game
