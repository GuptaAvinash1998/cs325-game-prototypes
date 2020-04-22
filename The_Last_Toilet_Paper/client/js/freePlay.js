var platforms;
var man1;
var man1_facing = 'left';
var jumpTimer = 0;
var cursor;
var spaceKey;
var move_instructions_man;
var exit_button;

//var mainState = { //create the main state of the gamed
GameStates.freePlayState = function (game) {

    return {
        preload: function () { //This is used to load the images and the sounds and is called at the beginning

            game.load.image('Surface', 'assets/platform.png');
            game.load.spritesheet('Man1', 'assets/SteamMan/SteamMan.png', 48, 48, 42);

        },

        create: function () { //This is used to set up the game, display the sprites, etc and is called after preload

            game.state.backgroundColor = "#000000"; //sets the background to black

            move_instructions_man = game.add.text(447, 10, "LEFT ARROW - Move left \nRIGHT ARROW - Move right" +
                "\n UP ARROW - Jump \n SPACE BAR - Attack ", {
                font: "bold 15px Arial",
                fill: "#FFFFFF",
                align: "left"
            });

            exit_button = game.add.text(10, 10, "X", { font: "40px Arial", fill: "#ff0044", align: "left" });

            exit_button.inputEnabled = true;

            exit_button.events.onInputOver.add(this.over, this);

            exit_button.events.onInputOut.add(this.out, this);

            exit_button.events.onInputDown.add(this.back_to_main, this);

            game.physics.startSystem(Phaser.Physics.ARCADE); //set the physics system

            game.world.setBounds(0, 0, 696, 448);

            platforms = game.add.physicsGroup(Phaser.Physics.ARCADE);

            platforms.create(0, 415, 'Surface');
            platforms.create(400, 415, 'Surface');


            platforms.setAll('body.collideWorldBounds', true);
            platforms.setAll('body.immovable', true);
            platforms.setAll('body.setSize(40, 60, true)', true);

            man1 = game.add.sprite(20, 240, 'Man1');
            man1.scale.x = 1.8;
            man1.scale.y = 1.8;
            game.physics.arcade.enable(man1);
            man1.body.gravity.y = 800;
            man1.body.collideWorldBounds = true;
            man1.body.setSize(19, 47, true);
            man1.animations.add('walk_left', [20, 0, 1, 2, 3, 4, 5], 18);
            man1.animations.add('walk_right', [6, 7, 8, 9, 10, 11], 18);
            man1.animations.add('punch_left', [23, 22, 21, 20, 19, 18]);
            man1.animations.add('punch_right', [12, 13, 14, 15, 16, 17]);
            man1.animations.add('jump_right', [24, 25, 26, 27, 28, 29]);
            man1.animations.add('jump_left', [30, 31, 32, 33, 34, 35]);
            man1.animations.add('hurt_right', [36, 37, 38]);
            man1.animations.add('hurt_left', [39, 40, 41]);

            cursor = game.input.keyboard.createCursorKeys();
            spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


        },

        update: function () { //This is called 60 times per second and contains the game logic

            game.physics.arcade.collide(man1, platforms);

            //console.log("Hello!");
            if (cursor.left.isDown) {
                man1.body.velocity.x = -250;
                man1.animations.play('walk_left', 18);
                man1_facing = 'left';
            } else if (cursor.right.isDown) {
                man1.body.velocity.x = 250;
                man1.animations.play('walk_right', 18);
                man1_facing = 'right';
            } else {
                man1.body.velocity.x = 0;
            }

            if (man1_facing === 'left' && spaceKey.isDown) {
                man1.animations.play('punch_left', 30);
            }

            if (man1_facing === 'right' && spaceKey.isDown) {
                man1.animations.play('punch_right', 30);
            }

            if (cursor.up.isDown && man1.body.touching.down && game.time.now > jumpTimer && man1_facing === 'left') {
                man1.body.velocity.y = -650;
                jumpTimer = game.time.now + 750;
                man1.animations.play('jump_left', 5);
            }

            if (cursor.up.isDown && man1.body.touching.down && game.time.now > jumpTimer && man1_facing === 'right') {
                man1.body.velocity.y = -650;
                jumpTimer = game.time.now + 750;
                man1.animations.play('jump_right', 5);
            }

        },

        over: function (item) {

            item.fill = "#ffff44";
        },

        out: function (item) {

            item.fill = "#ff0044";

        },

        back_to_main: function () {

            game.state.start('MainMenu');
        }
    }
};
