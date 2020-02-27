var snow;
var title;
var option1;
var option2;

GameStates.menuState = function (game, shared) {

    return{

        preload:function () {

            game.load.image('cat', 'assets/angry_push_Copy.jpg');
        },

        create:function () {

            snow = game.add.image(game.world.centerX - 150, game.world.centerY + 60, 'cat');
            title = game.add.text(20, game.world.centerY - 140, "CAT-TA-TACK",{font: "50px Arial", fill: "#ff0044", align: "left"});
            option1 = game.add.text(110, game.world.centerY - 50, "RULES", {font: "30px Arial", fill: "#ff0044", align: "left"});
            option2 = game.add.text(110, game.world.centerY , "PLAY", {font: "30px Arial", fill: "#ff0044", align: "left"});

            option1.inputEnabled = true;
            option2.inputEnabled = true;

            option1.events.onInputOver.add(this.over, this);
            option1.events.onInputOut.add(this.out, this);

            option2.events.onInputOver.add(this.over, this);
            option2.events.onInputOut.add(this.out, this);

            option1.events.onInputDown.add(this.rules, this);
            option2.events.onInputDown.add(this.playGame, this);

        },

        over:function(item) {

        item.fill = "#ffff44";
        },

        out:function(item) {

            item.fill = "#ff0044";

        },

        rules:function(item) {

            game.state.start('Rules');
        },

        playGame:function(item) {

            game.state.start('Intro');
        },
    }
}