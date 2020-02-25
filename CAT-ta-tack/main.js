var man;
var timer;
var mouse;

var mainState = { //create the main state of the gamed

    
    preload:function () { //This is used to load the images and the sounds and is called at the beginning

        this.load.image('Background', 'assets/background.png')
    },

    create:function () { //This is used to set up the game, display the sprites, etc and is called after preload

        game.add.image(0, 0, 'Background');

        game.physics.startSystem(Phaser.Physics.ARCADE); //set the physics system

        man = game.add.sprite(100, 245, 'Man'); //this sets the man sprite at position (100, 245)
        
        game.physics.arcade.enable(man); //adds physics to the man
		
		man.body.setSize(40, 53, true);
		man.body.collideWorldBounds = true;
    },

    update:function () { //This is called 60 times per second and contains the game logic

        man.rotation = game.physics.arcade.accelerateToPointer(man, game.input.activePointer, 900, 900);
    },

    /**follow:function(pointer){

        game.add.tween(man).to( { x: }, 100, null, true, 0, 0, false);
    },**/
    /**jump:function () {
        if(man.alive === false){
            return;
        }

        man.body.velocity.y = -350; //adds vertical velocity to the bird

        game.add.tween(this.fart_cloud).to( { alpha: 1, x: man.body.x - 40, y: man.body.y - 30}, 100, null, true, 0, 0, false); //everytime you jump, the fart cloud will appear for 0.8 seconds and dissapear
        game.time.events.add(Phaser.Timer.SECOND - 200, this.destroy_fart, this);
        this.fartSound.play();

    },

    hitBeans:function(){

        if(man.alive === false){
            return;
        }

        this.collectSound.play();

        game.add.tween(this.can).to( { alpha: 0}, 100, null, true, 0, 0, false); //when the beans are collected, it will dissapear

        this.can_count += 1;
        this.labelCount.text = "Cans collected: " + (Math.floor(this.can_count/17)); //the can count will increase and will be displayed

        if(Math.floor(this.can_count/17) === 2){

            man.body.enable = false; //when the can count is two, then the physics of the man will be diabled and this after 6 seconds it will be enabled again.

            game.time.events.add(Phaser.Timer.SECOND*6, this.deactivateShield, this); //after 6 seconds it will activate the physics
        }
    },

    deactivateShield:function(){

        man.body.enable = true; //enables the physics

        this.can_count = 0; //resets the can count
    },

    hitPipe:function(){

        if(man.alive === false){
            return;
        }

        man.alive = false;

        this.deadSound.play();

        game.time.events.remove(this.timer);

        this.pipes.forEach(function(p){ //when the man hits the pipes, the man will not be alive and the pipes will stop moving 
            p.body.velocity.x = 0;
        }, this);

        this.beans.forEach(function (b) { //so will the beans
            b.body.velocity.x = 0;
        })
    },

    destroy_fart:function(){
        game.add.tween(this.fart_cloud).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true); //makes the fart cloud dissapear
    },**/

    restartGame:function () { //restarts the game
        game.state.start('main');
    },

    /**addOnePipe:function (x, y) { //This adds a pipe into the world

        this.pipe = game.add.sprite(x, y, 'Pipe'); //adds the pipe sprite

        this.pipes.add(this.pipe); //adds the pipe sprite to the group

        game.physics.arcade.enable(this.pipe); //enables the physics to the pipe

        this.pipe.body.velocity.x = -200; //add velocity of the pipe to make it move left

        //kills the pipe when it is out of bounds
        this.pipe.checkWorldBounds = true;
        this.pipe.outOfBoundsKill = true;
    },

    addBeans:function(x, y){ //does the same function as the addOnePipe, except for the beans group

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
    }**/
};

var game = new Phaser.Game(350, 350); //Initializes Phaser and creates a 400px by 490px game

game.state.add('main', mainState); //adds the main state and calls it 'main'

game.state.start('main'); //start the state to actually start the game
