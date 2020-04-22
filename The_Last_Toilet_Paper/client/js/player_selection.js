var man1;
var man1_text;
var man1_select = false;
var man2;
var man2_text;
var woman1;
var woman1_text;
var woman2;
var game_text;
var title;
//var players = require("../server.js");
//var mainState = { //create the main state of the gamed
GameStates.selectionState = function (game) {

    return {
        preload: function () { //This is used to load the images and the sounds and is called at the beginning

            game.load.image('Surface', 'assets/platform.png');
            game.load.spritesheet('Man1', 'assets/SteamMan/SteamMan_run.png', 48, 48, 6);
            game.load.spritesheet('Woman1', 'assets/GraveRobber/GraveRobber_run.png', 48, 48, 6);
            game.load.spritesheet('Man2', 'assets/Woodcutter/Woodcutter_run.png', 48, 48, 6);
            game.load.spritesheet('Woman2', 'assets/Woman/Woman_walk.png', 48, 48, 6);
        },

        create: function () { //This is used to set up the game, display the sprites, etc and is called after preload

            game.state.backgroundColor = "#000000"; //sets the background to black

            title = game.add.text(180, 10, "Choose your fighter!", { font: "30px Arial", fill: "#ff0044", align: "left" });

            game_text = game.add.text(game.world.centerX - 100, game.world.centerY, "Let's play!", { font: "30px Arial", fill: "#ff0044", align: "left" });
            game_text.visible = false;
            game_text.inputEnabled = true;
            game_text.events.onInputOver.add(this.over, this);

            game_text.events.onInputOut.add(this.out, this);

            game_text.events.onInputDown.add(this.playGame, this);

            man1 = game.add.sprite(30, 10, 'Man1');
            man1.scale.x = 3;
            man1.scale.y = 3;
            man1.animations.add('Man1_run', [0, 1, 2, 3, 4, 5], 18);
            man1.inputEnabled = true;
            man1.events.onInputDown.add(this.visible_text, this);

            man1_text = game.add.text(40, 170, "Man 1", { font: "30px Arial", fill: "#ff0044", align: "left" });

            woman1 = game.add.sprite(470, 10, 'Woman1');
            woman1.scale.x = 3;
            woman1.scale.y = 3;
            woman1.animations.add('Woman1_run', [0, 1, 2, 3, 4, 5], 18);

            woman1_text = game.add.text(480, 170, "Woman 1", { font: "30px Arial", fill: "#ff0044", align: "left" });
            woman1.inputEnabled = true;
            woman1.events.onInputDown.add(this.visible_text, this);


            man2 = game.add.sprite(30, 220, 'Man2');
            man2.scale.x = 3;
            man2.scale.y = 3;
            man2.animations.add('Man2_run', [0, 1, 2, 3, 4, 5], 18);

            man2_text = game.add.text(40, 380, "Man 2", { font: "30px Arial", fill: "#ff0044", align: "left" });
            man2.inputEnabled = true;
            man2.events.onInputDown.add(this.visible_text, this);

            woman2 = game.add.sprite(470, 220, 'Woman2');
            woman2.scale.x = 3;
            woman2.scale.y = 3;
            woman2.animations.add('Woman2_run', [0, 1, 2, 3, 4, 5], 18);

            woman1_text = game.add.text(480, 380, "Woman 2", { font: "30px Arial", fill: "#ff0044", align: "left" });
            woman2.inputEnabled = true;
            woman2.events.onInputDown.add(this.visible_text, this);
        },

        update: function () { //This is called 60 times per second and contains the game logic

            man1.animations.play('Man1_run', 18);
            woman1.animations.play('Woman1_run', 18);
            man2.animations.play('Man2_run', 18);
            woman2.animations.play('Woman2_run', 18);

        },

        visible_text: function () {

            game_text.visible = true;
            man1_select = true;
            //players[socket.id].playerCharacter = man1;
            //console.log(players[socket.id].playerCharacter);
        },
        over: function (item) {

            item.fill = "#ffff44";
        },

        out: function (item) {

            item.fill = "#ff0044";

        },

        playGame: function () {

            game.state.start('Game');
        }
    }
};
