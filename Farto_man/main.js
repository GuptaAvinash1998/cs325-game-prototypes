var man;

var mainState = { //create the main state of the gamed

    
    preload:function () { //This is used to load the images and the sounds and is called at the beginning

        game.load.image('Bird', 'assets/bird.png'); //loads the bird
        game.load.image('Man', 'assets/Fart_man.png');
        game.load.image('Fart_cloud', 'assets/Fart_cloud.jpg'); //https://www.hiclipart.com/free-transparent-background-png-clipart-ixbvh
        game.load.image('Pipe', 'assets/pipe.png'); //loads the pipe
        game.load.audio('Fart', 'assets/short_fart.wav'); //loads the jump music
        game.load.audio('Dead', 'assets/kaboom.wav'); //loads the dead music
    },

    create:function () { //This is used to set up the game, display the sprites, etc and is called after preload

        //game.state.backgroundColor = "#FFFFFF"; //sets the background to blue

        game.physics.startSystem(Phaser.Physics.ARCADE); //set the physics system

        man = game.add.sprite(100, 245, 'Man'); //this sets the bird sprite at position (100, 245)

        //man.body.setSize(40, 53, true);
        
        game.physics.arcade.enable(man); //adds physics to the bird

        man.body.gravity.y = 1000; //add gravity to the bird to make it fall

        this.fart_cloud = game.add.sprite(man.body.x - 40, man.body.y - 30, 'Fart_cloud');
        this.fart_cloud.alpha = 0;

        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); //adds functionality to the spacebar

        spaceKey.onDown.add(this.jump, this); //This says call the jump function when spacebar is pressed

        this.pipes = game.add.group(); //creates an empty group

        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this); //calls the addRowOfPipes every 1.5 seconds

        this.score = 0;

        this.labelScore = game.add.text(20, 20, "0", {font: "30px Arial", fill: "#ffffff"});

        this.fartSound = game.add.audio('Fart');

        this.deadSound = game.add.audio('Dead');
    },

    update:function () { //This is called 60 times per second and contains the game logic

        if(man.y < 0 || man.y > 490){
            this.restartGame();
        }

        game.physics.arcade.overlap(man, this.pipes, this.hitPipe, null, this);
    },

    jump:function () {

        if(man.alive === false){
            return;
        }

        man.body.velocity.y = -350; //adds vertical velocity to the bird

        game.add.tween(this.fart_cloud).to( { alpha: 1, x: man.body.x - 40, y: man.body.y - 30}, 100, null, true, 0, 0, false);

        //game.add.tween(this.fart_cloud).to({alpha: 0}, 2500, Phaser.Easing.Linear.None, true)
        this.fartSound.play();
    },

    hitPipe:function(){

        if(man.alive === false){
            return;
        }

        man.alive = false;

        this.deadSound.play();

        game.time.events.remove(this.timer);

        this.pipes.forEach(function(p){
            p.body.velocity.x = 0;
        }, this);
    },

    restartGame:function () {
        game.state.start('main');
    },

    addOnePipe:function (x, y) { //This adds a pipe into the world

        var pipe = game.add.sprite(x, y, 'Pipe'); //adds the pipe sprite

        this.pipes.add(pipe); //adds the pipe sprite to the group

        game.physics.arcade.enable(pipe); //enables the physics to the pipe

        pipe.body.velocity.x = -200; //add velocity of the pipe to make it move left

        //kills the pipe when it is out of bounds
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },

    addRowOfPipes: function () { //This adds multiple pipes at the same time

        var hole = Math.floor(Math.random() * 5) + 1; //Picks a number between one and 5
        //This is where the hole is going to be for the bird to move through

        for (var i=0; i<8; i++){

            if(i !== hole && i !== hole+1){
                this.addOnePipe(400, i*60+10);
            }

            this.score++;
            this.labelScore.text = this.score;
        }
    }
};

var game = new Phaser.Game(400, 490); //Initializes Phaser and creates a 400px by 490px game

game.state.add('main', mainState); //adds the main state and calls it 'main'

game.state.start('main'); //start the state to actually start the game
