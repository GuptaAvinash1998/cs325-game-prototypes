var man;
var timer;

var mainState = { //create the main state of the gamed

    
    preload:function () { //This is used to load the images and the sounds and is called at the beginning

        game.load.image('Man', 'assets/Fart_man.png');
        game.load.image('Fart_cloud', 'assets/Fart_cloud.jpg'); //https://www.hiclipart.com/free-transparent-background-png-clipart-ixbvh
        game.load.image('Pipe', 'assets/pipe.png'); //loads the pipe
        game.load.audio('Fart', 'assets/short_fart.wav'); //loads the jump music
        game.load.audio('Dead', 'assets/kaboom.wav'); //loads the dead music
        game.load.audio('Collect', 'assets/collect_sound.wav');
        game.load.image('Can_of_beans', 'assets/Can_of_beans.jpg');
    },

    create:function () { //This is used to set up the game, display the sprites, etc and is called after preload

        //game.add.image('Background');
        game.physics.startSystem(Phaser.Physics.ARCADE); //set the physics system

        man = game.add.sprite(100, 245, 'Man'); //this sets the man sprite at position (100, 245)
        
        game.physics.arcade.enable(man); //adds physics to the man

        man.body.gravity.y = 1000; //add gravity to the man to make it fall
		
		man.body.setSize(40, 53, true);

        this.fart_cloud = game.add.sprite(man.body.x + 40, man.body.y - 30, 'Fart_cloud');
        this.fart_cloud.alpha = 0;

        //var beans = game.add.sprite(200, 145, 'Can_of_beans');
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); //adds functionality to the spacebar

        spaceKey.onDown.add(this.jump, this); //This says call the jump function when spacebar is pressed

        this.pipes = game.add.group(); //creates an empty group

        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this); //calls the addRowOfPipes every 1.5 seconds

        this.beans = game.add.group();

        this.score = 0;

        this.labelScore = game.add.text(20, 20, "0", {font: "30px Arial", fill: "#ffffff"});

        this.can_count = 0;

        this.labelCount = game.add.text(20, 60, "Cans collected: 0", {font: "30px Arial", fill: "#ffffff"});

        this.fartSound = game.add.audio('Fart');

        this.deadSound = game.add.audio('Dead');

        this.collectSound = game.add.audio('Collect');

        this.fart_cloud = game.add.sprite(man.body.x + 10, man.body.y - 30, 'Fart_cloud');
        this.fart_cloud.alpha = 0;
    },

    update:function () { //This is called 60 times per second and contains the game logic

        if(man.y < 0 || man.y > 490){
            this.restartGame();
        }

        game.physics.arcade.overlap(man, this.pipes, this.hitPipe, null, this);
        game.physics.arcade.overlap(man, this.beans, this.hitBeans, null, this);
    },

    jump:function () {
        if(man.alive === false){
            return;
        }

        man.body.velocity.y = -350; //adds vertical velocity to the bird

        game.add.tween(this.fart_cloud).to( { alpha: 1, x: man.body.x - 40, y: man.body.y - 30}, 100, null, true, 0, 0, false);
        game.time.events.add(Phaser.Timer.SECOND - 200, this.destroy_fart, this);
        this.fartSound.play();

    },

    hitBeans:function(){

        this.collectSound.play();

        game.add.tween(this.can).to( { alpha: 0}, 100, null, true, 0, 0, false);

        this.can_count += 1;
        this.labelCount.text = "Cans collected: " + (Math.floor(this.can_count/17));

        //console.log(Math.floor(this.can_count/17));

        if(Math.floor(this.can_count/17) === 2){

            man.body.enable = false;

            //this.pipes.enableBody = false;

            game.time.events.add(Phaser.Timer.SECOND*6, this.deactivateShield, this);
        }
    },

    /**deactivateinvisiPipe:function(){

        console.log("enabling the pipes group again")
        this.pipes.enableBody = true;
        this.can_count = 0;
    },**/

    deactivateShield:function(){

        man.body.enable = true;

        this.can_count = 0;
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

        this.beans.forEach(function (b) {
            b.body.velocity.x = 0;
        })
    },

    destroy_fart:function(){
        game.add.tween(this.fart_cloud).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true);
    },

    restartGame:function () {
        game.state.start('main');
    },

    addOnePipe:function (x, y) { //This adds a pipe into the world

        this.pipe = game.add.sprite(x, y, 'Pipe'); //adds the pipe sprite

        this.pipes.add(this.pipe); //adds the pipe sprite to the group

        game.physics.arcade.enable(this.pipe); //enables the physics to the pipe

        this.pipe.body.velocity.x = -200; //add velocity of the pipe to make it move left

        //kills the pipe when it is out of bounds
        this.pipe.checkWorldBounds = true;
        this.pipe.outOfBoundsKill = true;
    },

    addBeans:function(x, y){

        this.can = game.add.sprite(x, y, 'Can_of_beans');

        this.beans.add(this.can);

        game.physics.enable(this.can);

        this.can.body.velocity.x = -200;

        this.can.checkWorldBounds = true;
        this.can.outOfBoundsKill = true;
    },

    addRowOfPipes: function () { //This adds multiple pipes at the same time

        var hole = Math.floor(Math.random() * 5) + 1; //Picks a number between one and 5
        //This is where the hole is going to be for the bird to move through

        var bean_pop = Math.floor(Math.random() * 5) + 1;

        //console.log(bean_pop);
        for (var i=0; i<8; i++){

            if(i !== hole && i !== hole+1){
                this.addOnePipe(400, i*60+10);
            }else{

                if(i === hole && bean_pop === 4){

                    this.addBeans(400, i*60+40);
                }
            }

            this.score++;
            this.labelScore.text = (this.score / 8) - 1;
        }
    }
};

var game = new Phaser.Game(400, 490); //Initializes Phaser and creates a 400px by 490px game

game.state.add('main', mainState); //adds the main state and calls it 'main'

game.state.start('main'); //start the state to actually start the game
