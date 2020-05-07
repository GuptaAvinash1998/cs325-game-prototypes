var platforms;
var player1;
var player1_facing = 'left';
var player2;
var player2_facing = 'right';
var jumpTimer = 0;
var cursor;
var spaceKey;
var cardinal_keys;
var text1;
var text2;
var timer_text;
var timer_text1;
var tp;
var player1_has_tp = false;
var player2_has_tp = false;
var player1_timer;
var player2_timer;


GameStates.mainState = function (game) { //create the main state of the gamed

    return {
        preload: function () { //This is used to load the images and the sounds and is called at the beginning

            game.load.image('Surface', 'assets/platform.png');
            game.load.audio('Background_music', 'assets/From_the_new_world.mp3');
            game.load.audio('Man_damage', 'assets/wii_fit_man_damage.wav');
            game.load.audio('Woman_damage', 'assets/wii_fit_woman_damage.wav');
            game.load.image('TP', 'assets/TP.png');
        },

        create: function () { //This is used to set up the game, display the sprites, etc and is called after preload

            game.state.backgroundColor = "#000000"; //sets the background to black

            text1 = game.add.text(447, 10, "For Man \nLEFT ARROW - Move left \nRIGHT ARROW - Move right" +
                "\n UP ARROW - Jump \n SPACE BAR - Attack ", {
                font: "bold 15px Arial",
                fill: "#FFFFFF",
                align: "left"
            });

            text2 = game.add.text(10, 10, "For Woman \n A- Move left \n D - Move right" +
                "\n W - Jump \n ESC - Attack", {
                font: "bold 15px Arial",
                fill: "#FFFFFF",
                align: "left"
            });

            timer_text = game.add.text(10, 60, "Seconds since player 2 had the TP: ", {
                font: "bold 15px Arial",
                fill: "#FFFFFF",
                align: "left"
            });

            timer_text1 = game.add.text(10, 10, "Seconds since player 1 had the TP: ", {
                font: "bold 15px Arial",
                fill: "#FFFFFF",
                align: "left"
            });

            timer_text.visible = false;
            timer_text1.visible = false;

            game.physics.startSystem(Phaser.Physics.ARCADE); //set the physics system

            player1_timer = game.time.create(false);
            player2_timer = game.time.create(false);

            player1_timer.loop(Phaser.Timer.SECOND * 10, this.victory, this);
            player2_timer.loop(Phaser.Timer.SECOND * 10, this.victory, this);

            game.world.setBounds(0, 0, 696, 448);

            platforms = game.add.physicsGroup(Phaser.Physics.ARCADE);

            platforms.create(0, 415, 'Surface');
            platforms.create(400, 415, 'Surface');
            platforms.create(0, 250, 'Surface').scale.x = 0.5;
            platforms.create(496, 250, 'Surface').scale.x = 0.5;
            platforms.create(240, 130, 'Surface').scale.x = 0.5;

            platforms.setAll('body.collideWorldBounds', true);
            platforms.setAll('body.immovable', true);
            platforms.setAll('body.setSize(40, 60, true)', true);

            player1 = game.add.sprite(80, 240, players[0].key);
            player1.scale.x = 1.8;
            player1.scale.y = 1.8;

            player2 = game.add.sprite(160, 240, players[1].key);
            player2.scale.x = 1.8;
            player2.scale.y = 1.8;

            game.physics.arcade.enable([player1, player2]);

            player1.body.collideWorldBounds = true;
            player1.body.gravity.y = 800;
            player1.body.setSize(19, 47, true);

            player2.body.collideWorldBounds = true;
            player2.body.gravity.y = 800;
            player2.body.setSize(19, 47, true);

            if(player1.key === 'Man1'){
                player1.animations.add('walk_left', [20, 0, 1, 2, 3, 4, 5], 18);
                player1.animations.add('walk_right', [6, 7, 8, 9, 10, 11], 18);
                player1.animations.add('punch_left', [23, 22, 21, 20, 19, 18]);
                player1.animations.add('punch_right', [12, 13, 14, 15, 16, 17]);
                player1.animations.add('jump_right', [24, 25, 26, 27, 28, 29]);
                player1.animations.add('jump_left', [30, 31, 32, 33, 34, 35]);
                player1.animations.add('hurt_right', [36, 37, 38]);
                player1.animations.add('hurt_left', [39, 40, 41]);
            }

          if(player2.key === 'Man1'){
              player2.animations.add('walk_left', [20, 0, 1, 2, 3, 4, 5], 18);
              player2.animations.add('walk_right', [6, 7, 8, 9, 10, 11], 18);
              player2.animations.add('punch_left', [23, 22, 21, 20, 19, 18]);
              player2.animations.add('punch_right', [12, 13, 14, 15, 16, 17]);
              player2.animations.add('jump_right', [24, 25, 26, 27, 28, 29]);
              player2.animations.add('jump_left', [30, 31, 32, 33, 34, 35]);
              player2.animations.add('hurt_right', [36, 37, 38]);
              player2.animations.add('hurt_left', [39, 40, 41]);
          }

            if(player1.key === 'Man2'){
                player1.animations.add('walk_left', [31, 30, 29, 28, 27, 26], 18);
                player1.animations.add('walk_right', [20, 21, 22, 23, 24, 25], 18);
                player1.animations.add('punch_left', [11, 10, 9, 8, 7, 6], 18);
                player1.animations.add('punch_right', [0, 1, 2, 3, 4, 5]);
                player1.animations.add('jump_left', [32, 33, 34, 35, 36, 37]);
                player1.animations.add('jump_right', [43, 42, 41, 40, 39, 38]);
                player1.animations.add('hurt_right', [44, 45, 46]);
                player1.animations.add('hurt_left', [47, 48, 49]);
                player1.animations.add('idle_left', [16, 17, 18, 19]);
                player1.animations.add('idle_right', [12, 13, 14, 15]);
            }

            if(player2.key === 'Man2'){
                player2.animations.add('walk_left', [31, 30, 29, 28, 27, 26], 18);
                player2.animations.add('walk_right', [20, 21, 22, 23, 24, 25], 18);
                player2.animations.add('punch_left', [11, 10, 9, 8, 7, 6], 18);
                player2.animations.add('punch_right', [0, 1, 2, 3, 4, 5]);
                player2.animations.add('jump_left', [32, 33, 34, 35, 36, 37]);
                player2.animations.add('jump_right', [43, 42, 41, 40, 39, 38]);
                player2.animations.add('hurt_right', [44, 45, 46]);
                player2.animations.add('hurt_left', [47, 48, 49]);
                player2.animations.add('idle_left', [16, 17, 18, 19]);
                player2.animations.add('idle_right', [12, 13, 14, 15]);
            }

            if(player1.key === 'Woman1'){
                player1.animations.add('walk_left', [7, 8, 9, 10, 11, 12, 13], 18);
                player1.animations.add('walk_right', [0, 1, 2, 3, 4, 5, 6], 18);
                player1.animations.add('punch_left', [20, 21, 22, 23, 24, 25]);
                player1.animations.add('punch_right', [14, 15, 16, 17, 18, 19]);
                player1.animations.add('hurt_right', [38, 39, 40]);
                player1.animations.add('hurt_left', [41, 42, 43]);
            }

            if(player2.key === 'Woman1'){
                player2.animations.add('walk_left', [7, 8, 9, 10, 11, 12, 13], 18);
                player2.animations.add('walk_right', [0, 1, 2, 3, 4, 5, 6], 18);
                player2.animations.add('punch_left', [20, 21, 22, 23, 24, 25]);
                player2.animations.add('punch_right', [14, 15, 16, 17, 18, 19]);
                player2.animations.add('hurt_right', [38, 39, 40]);
                player2.animations.add('hurt_left', [41, 42, 43]);
            }

            if(player1.key === 'Woman2'){
                player1.animations.add('walk_left', [11, 10, 9, 8, 7, 6], 18);
                player1.animations.add('walk_right', [0, 1, 2, 3, 4, 5], 18);
                player1.animations.add('punch_left', [31, 30, 29, 28], 18);
                player1.animations.add('punch_right', [24, 25, 26, 27]);
                player1.animations.add('hurt_right', [20, 21]);
                player1.animations.add('hurt_left', [22, 23]);
                player1.animations.add('idle_left', [12, 13, 14, 15]);
                player1.animations.add('idle_right', [16, 17, 18, 19]);
            }

            if(player2.key === 'Woman2'){
                player2.animations.add('walk_left', [11, 10, 9, 8, 7, 6], 18);
                player2.animations.add('walk_right', [0, 1, 2, 3, 4, 5], 18);
                player2.animations.add('punch_left', [31, 30, 29, 28], 18);
                player2.animations.add('punch_right', [24, 25, 26, 27]);
                player2.animations.add('hurt_right', [20, 21]);
                player2.animations.add('hurt_left', [22, 23]);
                player2.animations.add('idle_left', [12, 13, 14, 15]);
                player2.animations.add('idle_right', [16, 17, 18, 19]);
            }

            tp = game.add.sprite((Math.random() * 641), (Math.random() * 371), 'TP');
            game.physics.arcade.enable(tp);

            tp.visible = false;
            tp.enable = false;

            game.time.events.add(Phaser.Timer.SECOND * 5, function(){
                text1.setText("");
                text2.setText("");
                tp.visible = true;
                timer_text.visible = true;
                timer_text1.visible = true;
                tp.enable = true;
            }, this);

            cursor = game.input.keyboard.createCursorKeys();
            spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            cardinal_keys = game.input.keyboard.addKeys({
                'up': Phaser.KeyCode.W,
                'left': Phaser.KeyCode.A,
                'right': Phaser.KeyCode.D,
                'punch': Phaser.KeyCode.ESC
            });

            this.music = game.add.audio('Background_music').play();
            this.woman_damage = game.add.audio('Woman_damage');
            this.man_damage = game.add.audio('Man_damage');
        },

        update: function () { //This is called 60 times per second and contains the game logic

            game.physics.arcade.collide(player1, platforms);
            game.physics.arcade.collide(player2, platforms);
            game.physics.arcade.collide(tp, platforms);

            if (cursor.left.isDown) {
                player1.body.velocity.x = -250;
                player1.animations.play('walk_left', 18);
                player1_facing = 'left';

            } else if (cursor.right.isDown) {
                player1.body.velocity.x = 250;
                player1.animations.play('walk_right', 18);
                player1_facing = 'right';

            } else {
                player1.body.velocity.x = 0;
            }

            if (player1_facing === 'left' && spaceKey.isDown) {
                player1.animations.play('punch_left', 30);
            }

            if (player1_facing === 'right' && spaceKey.isDown) {
                player1.animations.play('punch_right', 30);
            }

            if (cursor.up.isDown && player1.body.touching.down && game.time.now > jumpTimer && player1_facing === 'left') {
                player1.body.velocity.y = -650;
                jumpTimer = game.time.now + 750;
                player1.animations.play('jump_left', 5);
            }

            if (cursor.up.isDown && player1.body.touching.down && game.time.now > jumpTimer && player1_facing === 'right') {
                player1.body.velocity.y = -650;
                jumpTimer = game.time.now + 750;
                player1.animations.play('jump_right', 5);
            }

            if (cardinal_keys['right'].isDown) {
                player2.body.velocity.x = 250;
                player2.animations.play('walk_right', 18);
                player2_facing = 'right';

            } else if (cardinal_keys['left'].isDown) {
                player2.body.velocity.x = -250;
                player2.animations.play('walk_left', 18);
                player2_facing = 'left';

            } else {
                player2.body.velocity.x = 0;
            }

            if (player2_facing === 'left' && cardinal_keys['punch'].isDown) {
                player2.animations.play('punch_left', 30);
            }

            if (player2_facing === 'right' && cardinal_keys['punch'].isDown) {
                player2.animations.play('punch_right', 30);
            }

            if (cardinal_keys['up'].isDown && player2.body.touching.down && game.time.now > jumpTimer && player2_facing === 'left') {
                player2.body.velocity.y = -650;
                jumpTimer = game.time.now + 750;

            }

            if (cardinal_keys['up'].isDown && player2.body.touching.down && game.time.now > jumpTimer && player2_facing === 'left') {
                player2.body.velocity.y = -650;
                jumpTimer = game.time.now + 750;

            }
            if (cardinal_keys['up'].isDown && player2.body.touching.down && game.time.now > jumpTimer && player2_facing === 'right') {
                player2.body.velocity.y = -650;
                jumpTimer = game.time.now + 750;

            }

            //game.physics.arcade.collide(player1, player2, this.hitSprite, null, this);
            game.physics.arcade.overlap(player1, player2, this.hitSprite, null, this);
            game.physics.arcade.overlap(player2, player1, this.hitSprite, null, this);
            game.physics.arcade.overlap(player1, tp, this.collectedTP, null, this);
            game.physics.arcade.overlap(player2, tp, this.collectedTP, null, this);


            timer_text.setText("Seconds since player 2 held the TP: " + player2_timer.duration);
            timer_text1.setText("Seconds since player 1 held the TP: " + player1_timer.duration);

            if(tp.visible){
                text1.setText("");
            }
        },

        hitSprite: function () {

            if (spaceKey.isDown && player2_facing === 'left') {

                if(player2.key === 'Woman1'){
                    this.woman_damage.play();
                }else{

                    player2.animations.play('hurt_left', 5);

                    if(player2.key === 'Man1' || player2.key === 'Man2'){

                        this.man_damage.play();
                    }else{
                        this.woman_damage.play();
                    }
                }


                if(player2_has_tp){

                    tp.x = Math.random() * 641;
                    tp.y = Math.random() * 371;
                    tp.visible = true;
                    tp.body.enable = true;
                    player2_has_tp = false;
                    player2_timer.destroy();
                    player2_timer.loop(Phaser.Timer.SECOND * 10, this.victory, this);

                }

            }
            if (spaceKey.isDown && player2_facing === 'right') {

                if(player2.key === 'Woman1'){
                    this.woman_damage.play();
                }else{

                    player2.animations.play('hurt_right', 5);

                    if(player2.key === 'Man1' || player2.key === 'Man2'){

                        this.man_damage.play();

                    }else{
                        this.woman_damage.play();
                    }
                }

                if(player2_has_tp){

                    tp.x = Math.random() * 641;
                    tp.y = Math.random() * 371;
                    tp.visible = true;
                    tp.body.enable = true;
                    player2_has_tp = false;
                    player2_timer.destroy();
                    player2_timer.loop(Phaser.Timer.SECOND * 10, this.victory, this);

                }
            }

            if (cardinal_keys['punch'].isDown && player1_facing === 'right') {

                if(player1.key === 'Woman1'){
                    this.woman_damage.play();
                }else{

                    player1.animations.play('hurt_right', 5);

                    if(player1.key === 'Man1' || player1.key === 'Man2'){

                        this.man_damage.play();
                    }else{
                        this.woman_damage.play();
                    }
                }
                if(player1_has_tp){

                    tp.x = Math.random() * 641;
                    tp.y = Math.random() * 371;
                    tp.visible = true;
                    tp.body.enable = true;
                    player1_has_tp = false;
                    player1_timer.destroy();
                    player1_timer.loop(Phaser.Timer.SECOND * 10, this.victory, this);
                }
            }

            if (cardinal_keys['punch'].isDown && player1_facing === 'left') {

                if(player1.key === 'Woman1'){
                    this.woman_damage.play();
                }else{

                    player1.animations.play('hurt_left', 5);

                    if(player1.key === 'Man1' || player1.key === 'Man2'){

                        this.man_damage.play();
                    }else{
                        this.woman_damage.play();
                    }
                }

                if(player1_has_tp){

                    tp.x = Math.random() * 641;
                    tp.y = Math.random() * 371;
                    tp.visible = true;
                    tp.body.enable = true;
                    player1_has_tp = false;
                    player1_timer.destroy();
                    player1_timer.loop(Phaser.Timer.SECOND * 10, this.victory, this);
                }
            }

        },

        collectedTP:function (gameObject) {

            tp.visible = false;

            if(gameObject.key === player1.key){
                player1_has_tp = true;
                tp.body.enable = false;
                text1.setText("Player1 has the TP!!!!!");
                player1_timer.start();

            }else{
                player2_has_tp = true;
                tp.body.enable = false;
                text1.setText("Player2 has the TP!!!!!");
                player2_timer.start();
            }
        },

        victory: function () {

            if(player1_has_tp){
                this.music.stop();
                game.state.start('VictoryState1');
            }else{
                this.music.stop();
                game.state.start('VictoryState2');
            }
        }
    }
};
