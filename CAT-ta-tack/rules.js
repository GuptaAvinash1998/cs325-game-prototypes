var rule1;
var rule2;
var rule3;
var rule4;
var rule5;
var exit;

GameStates.ruleState = function (game, shared) {

    return{

        create:function() {
            rule1 = game.add.text(10, game.world.centerY - 150, "IN ORDER TO MOVE THE CAT, \nCLICK AND DRAG ON IT", {
                font: "20px Arial",
                fill: "#ff0044",
                align: "left"
            });

            rule2 = game.add.text(10, game.world.centerY - 80, "YOU CANNOT EXIT THE GAME\n SCREEN SO PLEASE DO NOT TRY!", {
                font: "20px Arial",
                fill: "#ff0044",
                align: "left"
            });

            rule3 = game.add.text(10, game.world.centerY - 10, "AVOID GETTING CAUGHT BY THE \nCRAZY CAT LADY", {
                font: "20px Arial",
                fill: "#ff0044",
                align: "left"
            });

            rule4 = game.add.text(10, game.world.centerY + 60, "AVOID GETTING HIT BY THE CATS", {
                font: "20px Arial",
                fill: "#ff0044",
                align: "left"
            });

            rule5 = game.add.text(10, game.world.centerY + 90, "HAVE FUN!!", {
                font: "30px Arial",
                fill: "#ff0044",
                align: "left"
            });

            exit = game.add.text(10, game.world.centerY + 130, "CLICK TO GO BACK TO MAIN MENU", {
                font: "20px Arial",
                fill: "#ff0044",
                align: "left"
            });

            exit.inputEnabled = true;

            exit.events.onInputOver.add(this.over, this);
            exit.events.onInputOut.add(this.out, this);

            exit.events.onInputDown.add(this.menuScreen, this);
        },

        over:function(item) {

            item.fill = "#ffff44";
        },

        out:function(item) {

            item.fill = "#ff0044";

        },

        menuScreen:function (item) {

            game.state.start('MainMenu');
        }
    }
}