var platforms;
var man1;
var man1_facing = 'left';
var woman1;
var woman1_facing = 'right';
var jumpTimer = 0;
var cursor;
var spaceKey;
var cardinal_keys;
var move_instructions_man;
var move_instructions_woman
var otherPlayer;
//var otherPlayers;
var self;
var characters = [];
var character_number;
//var character_facing = 'left';
var i = 0;
var char;
var x;
var y;
var tp;


GameStates.mainState = function (game) { //create the main state of the gamed

    return {
        preload: function () { //This is used to load the images and the sounds and is called at the beginning

            game.load.image('Surface', 'assets/platform.png');
            game.load.spritesheet('Woman1', 'assets/GraveRobber/GraveRobber.png', 48, 48, 26);
            game.load.spritesheet('Man1', 'assets/SteamMan/SteamMan.png', 48, 48, 42);
            game.load.image('TP', 'assets/TP.png');
            game.load.audio('Fart', 'assets/short_fart.wav'); //loads the jump music
            game.load.audio('Background_music', 'assets/From_the_new_world.mp3');
        },

        create: function () { //This is used to set up the game, display the sprites, etc and is called after preload

            game.state.backgroundColor = "#000000"; //sets the background to black

            game.physics.startSystem(Phaser.Physics.ARCADE); //set the physics system

            game.world.setBounds(0, 0, 696, 448);

            platforms = game.add.physicsGroup(Phaser.Physics.ARCADE);
            
            self = this;

            man1 = game.add.sprite(20, 240, 'Man1');
            woman1 = game.add.sprite(140, 240, 'Woman1');

            man1.visible = false;
            woman1.visible = false;

            characters.push(man1);
            characters.push(woman1);            

            this.socket = io('https://vortexcloud.online:9000/', { secure: true });

            let i = 140;

            this.otherPlayers = game.add.group();
            this.otherPlayers.physicsBosyType = Phaser.Physics.ARCADE;

            platforms.create(0, 415, 'Surface');
            platforms.create(400, 415, 'Surface');
            platforms.create(0, 250, 'Surface').scale.x = 0.5;
            platforms.create(496, 250, 'Surface').scale.x = 0.5;
            platforms.create(240, 130, 'Surface').scale.x = 0.5;

            platforms.setAll('body.collideWorldBounds', true);
            platforms.setAll('body.immovable', true);
            platforms.setAll('body.setSize(40, 60, true)', true);

            this.socket.on('currentPlayers', function (players) {

                Object.keys(players).forEach(function (id) {

                    if (players[id].playerId === self.socket.id) {

                        characters[players[id].character].visible = true;
                        character_number = players[id].character;
                        console.log(character_number);
                        x = characters[character_number].x;
                        y = characters[character_number].y;
                        
                    } else {
                        console.log("In currentPlayers");
                        const otherPlayer = self.add.sprite(i, man1.y, characters[players[id].character].key);
                        otherPlayer.playerId = players[id].playerId;
                        otherPlayer.scale.x = 1.8;
                        otherPlayer.scale.y = 1.8;
                        game.physics.arcade.enable(otherPlayer);
                        otherPlayer.body.gravity.y = 800;
                        otherPlayer.body.collideWorldBounds = true;
                        otherPlayer.body.setSize(19, 47, true);
                        self.otherPlayers.add(otherPlayer);
                    }
                });
            });

            this.socket.on('newPlayer', function (playerInfo) {

                console.log("In newPlayer");
                const otherPlayer = self.add.sprite(i, man1.y, characters[playerInfo.character].key);
                otherPlayer.scale.x = 1.8;
                otherPlayer.scale.y = 1.8;
                otherPlayer.playerId = playerInfo.playerId;
                game.physics.arcade.enable(otherPlayer);
                otherPlayer.body.gravity.y = 800;
                otherPlayer.body.collideWorldBounds = true;
                otherPlayer.body.setSize(19, 47, true);
                self.otherPlayers.add(otherPlayer);

            });

            this.socket.on('disconnect', function (playerId) {

                self.otherPlayers.children.forEach(function (otherPlayer) {

                    if (playerId === otherPlayer.playerId) {
                        otherPlayer.destroy();
                    }
                });
            });

            this.socket.on('playerMoved', function (playerInfo) {
                self.otherPlayers.children.forEach(function (otherPlayer) {
                    if (playerInfo.playerId === otherPlayer.playerId) {
                        otherPlayer.x = playerInfo.x;
                        otherPlayer.y = playerInfo.y;
                    }
                });
            });

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

            
            woman1.scale.x = 1.8;
            woman1.scale.y = 1.8;
            game.physics.arcade.enable(woman1);
            woman1.body.gravity.y = 800;
            woman1.body.collideWorldBounds = true;
            woman1.body.setSize(19, 47, true);
            woman1.animations.add('walk_left', [7, 8, 9, 10, 11, 12, 13], 18);
            woman1.animations.add('walk_right', [0, 1, 2, 3, 4, 5, 6], 18);
            woman1.animations.add('punch_left', [20, 21, 22, 23, 24, 25]);
            woman1.animations.add('punch_right', [14, 15, 16, 17, 18, 19]);
            woman1.animations.add('hurt_right', [38, 39, 40]);
            woman1.animations.add('hurt_left', [41, 42, 43]);

            

            
            this.socket.on('TPLocation', function (TPLocation) {
                
                tp = game.add.sprite(TPLocation.x, TPLocation.y, 'TP');
            });

            cursor = game.input.keyboard.createCursorKeys();
            spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            cardinal_keys = game.input.keyboard.addKeys({ 'up': Phaser.KeyCode.W, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D, 'punch': Phaser.KeyCode.ESC });

            this.fartSound = game.add.audio('Fart');
            this.music = game.add.audio('Background_music');
            this.music.play();
        },

        update: function () { //This is called 60 times per second and contains the game logic

            game.physics.arcade.collide(man1, platforms);
            game.physics.arcade.collide(woman1, platforms);
            //game.physics.arcade.collide(character, platforms);
            game.physics.arcade.collide(otherPlayer, platforms);

            
                
            if (cursor.left.isDown) {
                man1.body.velocity.x = -250;
                man1.animations.play('walk_left', 18);
                man1_facing = 'left';
            }

            else if (cursor.right.isDown) {
                man1.body.velocity.x = 250;
                man1.animations.play('walk_right', 18);
                man1_facing = 'right';
            }
            else {
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

            if (cardinal_keys['right'].isDown) {
                woman1.body.velocity.x = 250;
                woman1.animations.play('walk_right', 18);
                woman1_facing = 'right';
            }

            else if (cardinal_keys['left'].isDown) {
                woman1.body.velocity.x = -250;
                woman1.animations.play('walk_left', 18);
                woman1_facing = 'left';
            }
            else {
                woman1.body.velocity.x = 0;
            }
            
            if (woman1_facing === 'left' && cardinal_keys['punch'].isDown) {
                woman1.animations.play('punch_left', 30);
            }

            if (woman1_facing === 'right' && cardinal_keys['punch'].isDown) {
                woman1.animations.play('punch_right', 30);
            }

            if (cardinal_keys['up'].isDown && woman1.body.touching.down && game.time.now > jumpTimer && woman1_facing === 'left') {
                woman1.body.velocity.y = -650;
                jumpTimer = game.time.now + 750;

            }

            if (cardinal_keys['up'].isDown && woman1.body.touching.down && game.time.now > jumpTimer && woman1_facing === 'left') {
                woman1.body.velocity.y = -650;
                jumpTimer = game.time.now + 750;

            }
            if (cardinal_keys['up'].isDown && woman1.body.touching.down && game.time.now > jumpTimer && woman1_facing === 'right') {
                woman1.body.velocity.y = -650;
                jumpTimer = game.time.now + 750;

            }

            if (character_number === 0) {
                x = man1.x;
                y = man1.y;
            } else {
                x = woman1.x;
                y = woman1.y;
            }

            if (this.oldPosition && (x !== this.oldPosition.x || y !== this.oldPosition.y)) {

                this.socket.emit('playerMovement', { x: x, y: y});
            }

            this.oldPosition = {

                x: x,
                y: y
            };

            game.physics.arcade.collide(man1, tp, this.newTPloc, null, self);

            game.physics.arcade.collide(woman1, tp, this.newTPloc, null, self);

            //console.log(x + " , " + y);
            //var x = characters[character_number].x;
            //var y = characters[character_number].y;

            //game.physics.arcade.collide(man1, woman1, this.hitSprite, null, this);
            //game.physics.arcade.overlap(man1, woman1, this.hitSprite, null, this);
            //game.physics.arcade.overlap(woman1, man1, this.hitSprite, null, this);
        },

        newTPloc: function () {
            console.log("In newTPloc");
            this.socket.emit('TPCollected');
        },
        /**hitSprite: function () {

            if (spaceKey.isDown && woman1_facing === 'left') {
                //woman1.animations.play('hurt_left', 5);
                //console.log("true");
                this.fartSound.play();
            }
            if (spaceKey.isDown && woman1_facing === 'right') {
                //woman1.animations.play('hurt_left', 5);
                //console.log("true");
                this.fartSound.play();
            }

            if (cardinal_keys['punch'].isDown && man1_facing === 'right') {
                //woman1.animations.play('hurt_left', 5);
                //console.log("true");
                man1.animations.play('hurt_right', 1);
            }

            if (cardinal_keys['punch'].isDown && man1_facing === 'left') {
                //woman1.animations.play('hurt_left', 5);
                //console.log("true");
                man1.animations.play('hurt_left', 3);
            }

        },**/
    }
};
