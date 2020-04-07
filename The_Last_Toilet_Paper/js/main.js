var platforms;
var man1;
var man1_left;
var man1_left_animation;
var man1_right;
var dude;

var mainState = { //create the main state of the gamed


    preload:function () { //This is used to load the images and the sounds and is called at the beginning

        game.load.image('Surface', 'assets/platform.png');
        game.load.image('Man1', 'assets/1 Old_man/Old_man.png');
        game.load.spritesheet('Man1_walk_right', 'assets/1 Old_man/Old_man_walk.png');
        game.load.spritesheet('Man_walk_left', 'assets/1 Old_man/Old_man_walk_left.png',48, 48, 6);
        //game.load.spritesheet('dude', 'assets/dude.png',50, 50, 9);
    },

    create:function () { //This is used to set up the game, display the sprites, etc and is called after preload

        game.state.backgroundColor = "#000000"; //sets the background to black

        game.physics.startSystem(Phaser.Physics.ARCADE); //set the physics system

        platforms = game.add.group();
        platforms.enableBody = true;
        platforms.physicsBodyType = Phaser.Physics.ARCADE;


        platforms.create(0, 415, 'Surface');
        platforms.create(400, 415, 'Surface');
        platforms.create(60, 120, 'Surface').scale.set(0.5);

        //man1_left = game.add.sprite('Man1_walk_left');

        man1 = game.add.sprite(20, 340, 'Man1').scale.set(1.8);
        man1_left = game.add.sprite('Man1_walk_left').scale.set(1.8);

        man1_left.animations.add('walk_left'); //ERROR IS IN THIS LINE. IT SAYS "Cannot read property 'add' of undefined"


        //man1_left.animatio
        //man1_left.animations.play('walk_left');
        //var walk = man1.animations.add('left', [0,1,2], 60, true);
        //man1.animations.play('left', 30, true);
        //dude = game.add.sprite(20, 20, 'dude');
        //dude.animations.add('left', [0,1,2,3], 60, true);
        //dude.animations.play('left');

    },

    update:function () { //This is called 60 times per second and contains the game logic


    }
};

var game = new Phaser.Game(696, 448); //Initializes Phaser and creates a 400px by 490px game

game.state.add('main', mainState); //adds the main state and calls it 'main'

game.state.start('main'); //start the state to actually start the game
