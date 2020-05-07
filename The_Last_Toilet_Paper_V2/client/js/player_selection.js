var man1;
var man1_text;
var players = [null, null];
var man2;
var man2_text;
var woman1;
var woman1_text;
var woman2;
var woman2_text
var game_text;
var title;
var subtext1;
var subtext2;

GameStates.selectionState = function (game) {

    return {
        preload: function () { //This is used to load the images and the sounds and is called at the beginning

            game.load.spritesheet('Woman1', 'assets/GraveRobber/GraveRobber.png', 48, 48, 26);
            game.load.spritesheet('Man1', 'assets/SteamMan/SteamMan.png', 48, 48, 42);
            game.load.spritesheet('Man2', 'assets/Woodcutter/Woodcutter.png', 48, 48, 50);
            game.load.spritesheet('Woman2', 'assets/Woman/Woman.png', 48, 48, 32);
        },

        create: function () { //This is used to set up the game, display the sprites, etc and is called after preload

            game.state.backgroundColor = "#000000"; //sets the background to black

            title = game.add.text(180, 10, "Choose your fighter!", { font: "30px Arial", fill: "#ff0044", align: "left" });
            subtext1 = game.add.text(180, 70, "Player1 choose with left click", { font: "20px Arial", fill: "#ff0044", align: "left" });
            subtext2 = game.add.text(180, 100, "Player2 choose with right click", { font: "20px Arial", fill: "#ff0044", align: "left" });

            game_text = game.add.text(game.world.centerX - 100, game.world.centerY, "Let's play!", { font: "30px Arial", fill: "#ff0044", align: "left" });
            game_text.visible = false;
            game_text.inputEnabled = true;
            game_text.events.onInputOver.add(this.over, this);

            game_text.events.onInputOut.add(this.out, this);

            game_text.events.onInputDown.add(this.playGame, this);

            game.input.mouse.capture = true;

            man1 = game.add.sprite(30, 10, 'Man1');
            man1.scale.x = 3;
            man1.scale.y = 3;

            man1.animations.add('walk_right', [6, 7, 8, 9, 10, 11], 18);

            man1.inputEnabled = true;

            man1.events.onInputDown.add(this.add_to_players, this);

            man1_text = game.add.text(40, 170, "Man 1", { font: "30px Arial", fill: "#ff0044", align: "left" });

            woman1 = game.add.sprite(470, 10, 'Woman1');
            woman1.scale.x = 3;
            woman1.scale.y = 3;
            woman1.animations.add('walk_right', [0, 1, 2, 3, 4, 5, 6], 18);

            woman1_text = game.add.text(480, 170, "Woman 1", { font: "30px Arial", fill: "#ff0044", align: "left" });
            woman1.inputEnabled = true;
            woman1.events.onInputDown.add(this.add_to_players, this);


            man2 = game.add.sprite(30, 220, 'Man2');
            man2.scale.x = 3;
            man2.scale.y = 3;

            man2.animations.add('walk_right', [20, 21, 22, 23, 24, 25], 18);

            man2_text = game.add.text(40, 380, "Man 2", { font: "30px Arial", fill: "#ff0044", align: "left" });
            man2.inputEnabled = true;
            man2.events.onInputDown.add(this.add_to_players, this);

            woman2 = game.add.sprite(470, 220, 'Woman2');
            woman2.scale.x = 3;
            woman2.scale.y = 3;
            woman2.animations.add('walk_right', [0, 1, 2, 3, 4, 5], 18);

            woman2_text = game.add.text(480, 380, "Woman 2", { font: "30px Arial", fill: "#ff0044", align: "left" });
            woman2.inputEnabled = true;
            woman2.events.onInputDown.add(this.add_to_players, this);
        },

        update: function () {

            man1.animations.play('walk_right', 18);
            woman1.animations.play('walk_right', 18);
            man2.animations.play('walk_right', 18);
            woman2.animations.play('walk_right', 18);

            if(players[0] !== null && players[1] !== null){
                game_text.visible = true;
            }
        },

        over: function (item) {

            item.fill = "#ffff44";
        },

        out: function (item) {

            item.fill = "#ff0044";

        },

        playGame: function () {

            game.state.start('Game');
        },

        add_to_players : function (GameObject) {

            if(game.input.activePointer.leftButton.isDown){

                players[0] = GameObject;
                subtext1.setText("player 1 is " + players[0].key);
            }

            if(game.input.activePointer.rightButton.isDown){

                players[1] = GameObject;
                subtext2.setText("player 2 is " + players[1].key);
            }
        }
    }
};
